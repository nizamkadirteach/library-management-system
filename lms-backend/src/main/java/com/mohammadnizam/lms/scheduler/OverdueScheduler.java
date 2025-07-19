package com.mohammadnizam.lms.scheduler;

import com.mohammadnizam.lms.model.BorrowRecord;
import com.mohammadnizam.lms.repository.BorrowRecordRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
public class OverdueScheduler {

    @Autowired
    private BorrowRecordRepository borrowRecordRepository;

    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void updateOverdueFines() {
        LocalDate today = LocalDate.now();
        List<BorrowRecord> overdue = borrowRecordRepository.findByDueDateBeforeAndReturnDateIsNull(today);
        for (BorrowRecord record : overdue) {
            long days = ChronoUnit.DAYS.between(record.getDueDate(), today);
            BigDecimal fine = BigDecimal.valueOf(days * 0.5).setScale(2, RoundingMode.HALF_UP);
            if (fine.compareTo(BigDecimal.valueOf(20)) > 0) {
                fine = BigDecimal.valueOf(20);
            }
            if (record.getFine() == null || record.getFine().compareTo(fine) != 0) {
                record.setFine(fine);
                borrowRecordRepository.save(record);
            }
        }
    }
}
