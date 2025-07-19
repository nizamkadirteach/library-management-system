package com.mohammadnizam.lms.service;

import com.mohammadnizam.lms.model.Book;
import com.mohammadnizam.lms.model.BorrowRecord;
import com.mohammadnizam.lms.model.Member;
import com.mohammadnizam.lms.repository.BorrowRecordRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class NotificationServiceTest {

    @Mock
    private BorrowRecordRepository borrowRecordRepository;

    @Mock
    private JavaMailSender mailSender;

    @InjectMocks
    private NotificationService notificationService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void sendOverdueNotifications_sendsEmailForOverdue() {
        Member member = new Member();
        member.setContactInfo("user@example.com");
        Book book = new Book();
        book.setTitle("Test Book");
        BorrowRecord record = new BorrowRecord();
        record.setMember(member);
        record.setBook(book);
        record.setDueDate(LocalDate.now().minusDays(1));

        when(borrowRecordRepository.findByDueDateBeforeAndReturnDateIsNull(any(LocalDate.class)))
                .thenReturn(List.of(record));

        notificationService.sendOverdueNotifications();

        ArgumentCaptor<SimpleMailMessage> captor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(mailSender, times(1)).send(captor.capture());
        SimpleMailMessage msg = captor.getValue();
        assertThat(msg.getTo()[0]).isEqualTo("user@example.com");
        assertThat(msg.getText()).contains("Test Book");
    }
}
