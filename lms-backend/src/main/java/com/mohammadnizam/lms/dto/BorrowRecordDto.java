package com.mohammadnizam.lms.dto;

import com.mohammadnizam.lms.model.BorrowRecord;

import java.math.BigDecimal;
import java.time.LocalDate;

public class BorrowRecordDto {
    private Integer recordId;
    private Integer memberId;
    private Integer bookId;
    private LocalDate borrowDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private BigDecimal fine;
    private Integer renewalCount;

    public BorrowRecordDto() {
    }

    public BorrowRecordDto(Integer recordId, Integer memberId, Integer bookId, LocalDate borrowDate,
                           LocalDate dueDate, LocalDate returnDate, Integer renewalCount, BigDecimal fine) {
        this.recordId = recordId;
        this.memberId = memberId;
        this.bookId = bookId;
        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
        this.renewalCount = renewalCount;
        this.fine = fine;
    }

    public Integer getRecordId() {
        return recordId;
    }

    public void setRecordId(Integer recordId) {
        this.recordId = recordId;
    }

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public LocalDate getBorrowDate() {
        return borrowDate;
    }

    public void setBorrowDate(LocalDate borrowDate) {
        this.borrowDate = borrowDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public Integer getRenewalCount() {
        return renewalCount;
    }

    public void setRenewalCount(Integer renewalCount) {
        this.renewalCount = renewalCount;
    }

    public BigDecimal getFine() {
        return fine;
    }

    public void setFine(BigDecimal fine) {
        this.fine = fine;
    }

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
