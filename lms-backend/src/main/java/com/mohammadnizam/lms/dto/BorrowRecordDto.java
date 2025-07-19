package com.mohammadnizam.lms.dto;

import com.mohammadnizam.lms.model.BorrowRecord;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BorrowRecordDto {
    private Integer recordId;
    private Integer memberId;
    private Integer bookId;
    private LocalDate borrowDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private BigDecimal fine;
    private Integer renewalCount;

    public static BorrowRecordDto fromEntity(BorrowRecord record) {
        if (record == null) {
            return null;
        }
        BorrowRecordDto dto = new BorrowRecordDto();
        dto.setRecordId(record.getRecordId());
        if (record.getMember() != null) {
            dto.setMemberId(record.getMember().getMemberId());
        }
        if (record.getBook() != null) {
            dto.setBookId(record.getBook().getBookId());
        }
        dto.setBorrowDate(record.getBorrowDate());
        dto.setDueDate(record.getDueDate());
        dto.setReturnDate(record.getReturnDate());
        dto.setRenewalCount(record.getRenewalCount());
        dto.setFine(record.getFine());
        return dto;
    }
}
