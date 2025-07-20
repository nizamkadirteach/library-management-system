package com.mohammadnizam.lms.dto;

import com.mohammadnizam.lms.model.BorrowRecord;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BorrowRecordDto {
    private Integer recordId;
    private Integer memberId;
    private String memberName;
    private Integer bookId;
    private String bookTitle;
    private LocalDate borrowDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private BigDecimal fine;
    private Integer renewalCount;
    private long daysOverdue;

    public static BorrowRecordDto fromEntity(BorrowRecord record) {
        if (record == null) {
            return null;
        }
        BorrowRecordDto dto = new BorrowRecordDto();
        dto.setRecordId(record.getRecordId());
        if (record.getMember() != null) {
            dto.setMemberId(record.getMember().getMemberId());
            dto.setMemberName(record.getMember().getFullName());
        }
        if (record.getBook() != null) {
            dto.setBookId(record.getBook().getBookId());
            dto.setBookTitle(record.getBook().getTitle());
        }
        dto.setBorrowDate(record.getBorrowDate());
        dto.setDueDate(record.getDueDate());
        dto.setReturnDate(record.getReturnDate());
        dto.setRenewalCount(record.getRenewalCount());
        dto.setFine(record.getFine());
        long overdue = 0;
        if (record.getDueDate() != null) {
            LocalDate compareDate = record.getReturnDate() != null ?
                    record.getReturnDate() : LocalDate.now();
            if (compareDate.isAfter(record.getDueDate())) {
                overdue = ChronoUnit.DAYS.between(record.getDueDate(), compareDate);
            }
        }
        dto.setDaysOverdue(overdue);
        return dto;
    }
}
