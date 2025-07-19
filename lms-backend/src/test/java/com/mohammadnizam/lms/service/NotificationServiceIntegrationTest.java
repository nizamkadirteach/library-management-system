package com.mohammadnizam.lms.service;

import com.mohammadnizam.lms.model.Book;
import com.mohammadnizam.lms.model.BorrowRecord;
import com.mohammadnizam.lms.model.Member;
import com.mohammadnizam.lms.repository.BorrowRecordRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mail.javamail.JavaMailSender;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class NotificationServiceIntegrationTest {

    @Autowired
    private NotificationService notificationService;

    @MockBean
    private BorrowRecordRepository borrowRecordRepository;

    @MockBean
    private JavaMailSender mailSender;

    @Test
    void sendOverdueNotifications_invokedInSpringContext() {
        Member member = new Member();
        member.setContactInfo("test@example.com");
        Book book = new Book();
        book.setTitle("Title");
        BorrowRecord record = new BorrowRecord();
        record.setMember(member);
        record.setBook(book);
        record.setDueDate(LocalDate.now().minusDays(1));

        when(borrowRecordRepository.findByDueDateBeforeAndReturnDateIsNull(any(LocalDate.class)))
                .thenReturn(List.of(record));

        notificationService.sendOverdueNotifications();

        verify(mailSender, times(1)).send(any());
    }
}
