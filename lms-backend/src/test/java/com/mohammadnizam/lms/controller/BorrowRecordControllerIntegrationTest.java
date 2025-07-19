package com.mohammadnizam.lms.controller;

import com.mohammadnizam.lms.model.Book;
import com.mohammadnizam.lms.model.BorrowRecord;
import com.mohammadnizam.lms.model.Member;
import com.mohammadnizam.lms.model.User;
import com.mohammadnizam.lms.model.Role;
import com.mohammadnizam.lms.model.BookStatus;
import com.mohammadnizam.lms.repository.BookRepository;
import com.mohammadnizam.lms.repository.BorrowRecordRepository;
import com.mohammadnizam.lms.repository.MemberRepository;
import com.mohammadnizam.lms.repository.UserRepository;
import com.mohammadnizam.lms.security.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class BorrowRecordControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BorrowRecordRepository borrowRecordRepository;

    private Member createMemberWithUser() {
        User user = new User();
        user.setUsername("member1");
        user.setPassword("pass");
        user.setRole(Role.MEMBER);
        user.setCreatedAt(LocalDateTime.now());
        user = userRepository.save(user);

        Member member = new Member();
        member.setFullName("John Doe");
        member.setAddress("Address");
        member.setContactInfo("123456");
        member.setMembershipStart(LocalDate.now());
        member.setMembershipEnd(LocalDate.now().plusDays(30));
        member.setUser(user);
        return memberRepository.save(member);
    }

    private String authHeader(Member member) {
        String token = jwtUtil.generateToken(member.getUser().getUsername());
        return "Bearer " + token;
    }

    @Test
    void borrowBook_failsWhenNoCopies() throws Exception {
        Member member = createMemberWithUser();
        String auth = authHeader(member);

        Book book = new Book();
        book.setIsbn("111");
        book.setTitle("Test Book");
        book.setAuthor("Author");
        book.setCategory("Fiction");
        book.setPublicationYear(2023);
        book.setCopiesAvailable(0);
        book.setStatus(BookStatus.BORROWED);
        book = bookRepository.save(book);

        mockMvc.perform(post("/api/borrow-records/borrow")
                .param("memberId", member.getMemberId().toString())
                .param("bookId", book.getBookId().toString())
                .header("Authorization", auth))
                .andExpect(status().isBadRequest());

        assertThat(borrowRecordRepository.count()).isZero();
        Book updated = bookRepository.findById(book.getBookId()).orElseThrow();
        assertThat(updated.getCopiesAvailable()).isZero();
    }

    @Test
    void borrowBook_failsWhenActiveLimitReached() throws Exception {
        Member member = createMemberWithUser();
        String auth = authHeader(member);

        for (int i = 0; i < 3; i++) {
            Book b = new Book();
            b.setIsbn("active" + i);
            b.setTitle("Book" + i);
            b.setAuthor("Author");
            b.setCategory("Fiction");
            b.setPublicationYear(2023);
            b.setCopiesAvailable(0);
            b.setStatus(BookStatus.BORROWED);
            b = bookRepository.save(b);

            BorrowRecord r = new BorrowRecord();
            r.setMember(member);
            r.setBook(b);
            r.setBorrowDate(LocalDate.now().minusDays(1));
            r.setDueDate(LocalDate.now().plusDays(13));
            r.setFine(BigDecimal.ZERO);
            borrowRecordRepository.save(r);
        }

        Book newBook = new Book();
        newBook.setIsbn("new1");
        newBook.setTitle("New Book");
        newBook.setAuthor("Author");
        newBook.setCategory("Fiction");
        newBook.setPublicationYear(2023);
        newBook.setCopiesAvailable(1);
        newBook.setStatus(BookStatus.AVAILABLE);
        newBook = bookRepository.save(newBook);

        mockMvc.perform(post("/api/borrow-records/borrow")
                        .param("memberId", member.getMemberId().toString())
                        .param("bookId", newBook.getBookId().toString())
                        .header("Authorization", auth))
                .andExpect(status().isBadRequest());

        assertThat(borrowRecordRepository.count()).isEqualTo(3);
        Book unchanged = bookRepository.findById(newBook.getBookId()).orElseThrow();
        assertThat(unchanged.getCopiesAvailable()).isEqualTo(1);
    }

    @Test
    void borrowBook_failsWhenOutstandingFinesExceedLimit() throws Exception {
        Member member = createMemberWithUser();
        String auth = authHeader(member);

        Book fineBook = new Book();
        fineBook.setIsbn("fine1");
        fineBook.setTitle("Fine Book");
        fineBook.setAuthor("Author");
        fineBook.setCategory("Fiction");
        fineBook.setPublicationYear(2023);
        fineBook.setCopiesAvailable(1);
        fineBook.setStatus(BookStatus.AVAILABLE);
        fineBook = bookRepository.save(fineBook);

        BorrowRecord record = new BorrowRecord();
        record.setMember(member);
        record.setBook(fineBook);
        record.setBorrowDate(LocalDate.now().minusDays(10));
        record.setDueDate(LocalDate.now().minusDays(5));
        record.setReturnDate(LocalDate.now().minusDays(3));
        record.setFine(BigDecimal.valueOf(15));
        borrowRecordRepository.save(record);

        Book borrowable = new Book();
        borrowable.setIsbn("borrowable");
        borrowable.setTitle("Borrowable");
        borrowable.setAuthor("Author");
        borrowable.setCategory("Fiction");
        borrowable.setPublicationYear(2023);
        borrowable.setCopiesAvailable(1);
        borrowable.setStatus(BookStatus.AVAILABLE);
        borrowable = bookRepository.save(borrowable);

        mockMvc.perform(post("/api/borrow-records/borrow")
                        .param("memberId", member.getMemberId().toString())
                        .param("bookId", borrowable.getBookId().toString())
                        .header("Authorization", auth))
                .andExpect(status().isBadRequest());

        assertThat(borrowRecordRepository.count()).isEqualTo(1);
    }

    @Test
    void returnBook_setsFineIfOverdue() throws Exception {
        Member member = createMemberWithUser();
        String auth = authHeader(member);

        Book book = new Book();
        book.setIsbn("222");
        book.setTitle("Another Book");
        book.setAuthor("Author");
        book.setCategory("Fiction");
        book.setPublicationYear(2023);
        book.setCopiesAvailable(0);
        book.setStatus(BookStatus.BORROWED);
        book = bookRepository.save(book);

        BorrowRecord record = new BorrowRecord();
        record.setMember(member);
        record.setBook(book);
        record.setBorrowDate(LocalDate.now().minusDays(10));
        record.setDueDate(LocalDate.now().minusDays(5));
        record.setFine(BigDecimal.ZERO);
        record = borrowRecordRepository.save(record);

        mockMvc.perform(put("/api/borrow-records/return/" + record.getRecordId())
                .header("Authorization", auth))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.fine").value(2.5));

        BorrowRecord updatedRecord = borrowRecordRepository.findById(record.getRecordId()).orElseThrow();
        assertThat(updatedRecord.getFine()).isEqualByComparingTo(BigDecimal.valueOf(2.5));

        Book returnedBook = bookRepository.findById(book.getBookId()).orElseThrow();
        assertThat(returnedBook.getCopiesAvailable()).isEqualTo(1);
        assertThat(returnedBook.getStatus()).isEqualTo(BookStatus.AVAILABLE);
    }

    @Test
    void renewBook_incrementsCountAndExtendsDueDate() throws Exception {
        Member member = createMemberWithUser();
        String auth = authHeader(member);

        Book book = new Book();
        book.setIsbn("333");
        book.setTitle("Renewable Book");
        book.setAuthor("Author");
        book.setCategory("Fiction");
        book.setPublicationYear(2023);
        book.setCopiesAvailable(1);
        book.setStatus(BookStatus.AVAILABLE);
        book = bookRepository.save(book);

        BorrowRecord record = new BorrowRecord();
        record.setMember(member);
        record.setBook(book);
        record.setBorrowDate(LocalDate.now());
        record.setDueDate(LocalDate.now().plusDays(14));
        record.setRenewalCount(0);
        record.setFine(BigDecimal.ZERO);
        record = borrowRecordRepository.save(record);

        mockMvc.perform(put("/api/borrow-records/renew/" + record.getRecordId())
                .header("Authorization", auth))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.renewalCount").value(1));

        BorrowRecord updated = borrowRecordRepository.findById(record.getRecordId()).orElseThrow();
        assertThat(updated.getRenewalCount()).isEqualTo(1);
        assertThat(updated.getDueDate()).isEqualTo(record.getDueDate().plusDays(14));
    }

    @Test
    void getOverdueRecords_returnsOverdueList() throws Exception {
        Member member = createMemberWithUser();
        String auth = authHeader(member);

        Book book = new Book();
        book.setIsbn("444");
        book.setTitle("Overdue Book");
        book.setAuthor("Author");
        book.setCategory("Fiction");
        book.setPublicationYear(2023);
        book.setCopiesAvailable(1);
        book.setStatus(BookStatus.AVAILABLE);
        book = bookRepository.save(book);

        BorrowRecord overdue = new BorrowRecord();
        overdue.setMember(member);
        overdue.setBook(book);
        overdue.setBorrowDate(LocalDate.now().minusDays(20));
        overdue.setDueDate(LocalDate.now().minusDays(5));
        overdue.setFine(BigDecimal.ZERO);
        overdue = borrowRecordRepository.save(overdue);

        mockMvc.perform(get("/api/borrow-records/overdue")
                        .header("Authorization", auth))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].recordId").value(overdue.getRecordId()));
    }

    @Test
    void searchMyRecords_filtersResults() throws Exception {
        Member member = createMemberWithUser();
        String auth = authHeader(member);

        Book bookA = new Book();
        bookA.setIsbn("s1");
        bookA.setTitle("Unique Alpha");
        bookA.setAuthor("A");
        bookA.setCategory("Cat");
        bookA.setPublicationYear(2024);
        bookA.setCopiesAvailable(1);
        bookA.setStatus(BookStatus.AVAILABLE);
        bookA = bookRepository.save(bookA);

        Book bookB = new Book();
        bookB.setIsbn("s2");
        bookB.setTitle("Beta");
        bookB.setAuthor("B");
        bookB.setCategory("Cat");
        bookB.setPublicationYear(2024);
        bookB.setCopiesAvailable(1);
        bookB.setStatus(BookStatus.AVAILABLE);
        bookB = bookRepository.save(bookB);

        BorrowRecord rec1 = new BorrowRecord();
        rec1.setMember(member);
        rec1.setBook(bookA);
        rec1.setBorrowDate(LocalDate.of(2024, 1, 5));
        rec1.setDueDate(LocalDate.of(2024, 1, 19));
        rec1.setFine(BigDecimal.ZERO);
        rec1 = borrowRecordRepository.save(rec1);

        BorrowRecord rec2 = new BorrowRecord();
        rec2.setMember(member);
        rec2.setBook(bookB);
        rec2.setBorrowDate(LocalDate.of(2024, 3, 5));
        rec2.setDueDate(LocalDate.of(2024, 3, 19));
        rec2.setFine(BigDecimal.ZERO);
        borrowRecordRepository.save(rec2);

        mockMvc.perform(get("/api/borrow-records/my/search")
                        .param("title", "Alpha")
                        .param("startDate", "2024-01-01")
                        .param("endDate", "2024-01-31")
                        .header("Authorization", auth))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].recordId").value(rec1.getRecordId()));
    }
}
