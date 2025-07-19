package com.mohammadnizam.lms.service;

import com.mohammadnizam.lms.model.BorrowRecord;
import com.mohammadnizam.lms.model.Member;
import com.mohammadnizam.lms.repository.BorrowRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    @Autowired
    private BorrowRecordRepository borrowRecordRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${mail.from:library@example.com}")
    private String fromAddress;

    public void sendOverdueNotifications() {
        LocalDate today = LocalDate.now();
        List<BorrowRecord> overdue = borrowRecordRepository
                .findByDueDateBeforeAndReturnDateIsNull(today);
        Map<Member, List<BorrowRecord>> byMember = overdue.stream()
                .collect(Collectors.groupingBy(BorrowRecord::getMember));

        for (Map.Entry<Member, List<BorrowRecord>> entry : byMember.entrySet()) {
            Member member = entry.getKey();
            String email = member.getContactInfo();
            if (email == null || email.isBlank()) {
                continue;
            }
            String titles = entry.getValue().stream()
                    .map(br -> br.getBook().getTitle())
                    .collect(Collectors.joining(", "));
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromAddress);
            message.setTo(email);
            message.setSubject("Overdue Library Items");
            message.setText("You have overdue items: " + titles);
            mailSender.send(message);
        }
    }
}
