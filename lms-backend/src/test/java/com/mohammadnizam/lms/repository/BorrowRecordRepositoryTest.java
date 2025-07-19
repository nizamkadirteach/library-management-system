package com.mohammadnizam.lms.repository;

import com.mohammadnizam.lms.model.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class BorrowRecordRepositoryTest {

    @Autowired
    private BorrowRecordRepository borrowRecordRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;

    @Test
    void searchByMemberAndFilters_filtersCorrectly() {
        User user = new User();
        user.setUsername("repoUser");
        user.setPassword("pass");
        user.setRole(Role.MEMBER);
        user.setCreatedAt(LocalDateTime.now());
        user = userRepository.save(user);

        Member member = new Member();
        member.setFullName("Repo Member");
        member.setAddress("Addr");
        member.setContactInfo("123");
        member.setMembershipStart(LocalDate.now());
        member.setMembershipEnd(LocalDate.now().plusDays(1));
        member.setUser(user);
        member = memberRepository.save(member);

        Book book1 = new Book();
        book1.setIsbn("r1");
        book1.setTitle("Alpha Title");
        book1.setAuthor("A");
        book1.setCategory("Cat");
        book1.setPublicationYear(2024);
        book1.setCopiesAvailable(1);
        book1.setStatus(BookStatus.AVAILABLE);
        book1 = bookRepository.save(book1);

        Book book2 = new Book();
        book2.setIsbn("r2");
        book2.setTitle("Beta Title");
        book2.setAuthor("B");
        book2.setCategory("Cat");
        book2.setPublicationYear(2024);
        book2.setCopiesAvailable(1);
        book2.setStatus(BookStatus.AVAILABLE);
        book2 = bookRepository.save(book2);

        BorrowRecord rec1 = new BorrowRecord();
        rec1.setMember(member);
        rec1.setBook(book1);
        rec1.setBorrowDate(LocalDate.of(2024,1,10));
        rec1.setDueDate(LocalDate.of(2024,1,24));
        rec1.setFine(BigDecimal.ZERO);
        rec1 = borrowRecordRepository.save(rec1);

        BorrowRecord rec2 = new BorrowRecord();
        rec2.setMember(member);
        rec2.setBook(book2);
        rec2.setBorrowDate(LocalDate.of(2024,3,10));
        rec2.setDueDate(LocalDate.of(2024,3,24));
        rec2.setFine(BigDecimal.ZERO);
        rec2 = borrowRecordRepository.save(rec2);

        List<BorrowRecord> results = borrowRecordRepository.searchByMemberAndFilters(
                member.getMemberId(), "Alpha", LocalDate.of(2024,1,1), LocalDate.of(2024,1,31));

        assertThat(results).extracting(BorrowRecord::getRecordId).containsExactly(rec1.getRecordId());
    }
}
