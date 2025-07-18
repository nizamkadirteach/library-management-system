package com.mohammadnizam.lms.controller;

import com.mohammadnizam.lms.model.Book;
import com.mohammadnizam.lms.model.BorrowRecord;
import com.mohammadnizam.lms.model.Member;
import com.mohammadnizam.lms.model.User;
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

import static org.assertj.core.api.Assertions.assertThat;
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
        user.setRole("MEMBER");
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
        book.setStatus("BORROWED");
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
        book.setStatus("BORROWED");
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
                .andExpect(jsonPath("$.fine").value(5));

        BorrowRecord updatedRecord = borrowRecordRepository.findById(record.getRecordId()).orElseThrow();
        assertThat(updatedRecord.getFine().intValue()).isEqualTo(5);

        Book returnedBook = bookRepository.findById(book.getBookId()).orElseThrow();
        assertThat(returnedBook.getCopiesAvailable()).isEqualTo(1);
        assertThat(returnedBook.getStatus()).isEqualTo("AVAILABLE");
    }
}
