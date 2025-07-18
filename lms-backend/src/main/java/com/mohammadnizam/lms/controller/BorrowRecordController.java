package com.mohammadnizam.lms.controller;

import com.mohammadnizam.lms.dto.BorrowRecordDto;
import com.mohammadnizam.lms.model.Book;
import com.mohammadnizam.lms.model.BookStatus;
import com.mohammadnizam.lms.model.BorrowRecord;
import com.mohammadnizam.lms.model.Member;
import com.mohammadnizam.lms.repository.BookRepository;
import com.mohammadnizam.lms.repository.BorrowRecordRepository;
import com.mohammadnizam.lms.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/borrow-records")
public class BorrowRecordController {

    @Autowired
    private BorrowRecordRepository borrowRecordRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public ResponseEntity<List<BorrowRecordDto>> getAllRecords() {
        List<BorrowRecordDto> list = borrowRecordRepository.findAll()
                .stream()
                .map(BorrowRecordDto::fromEntity)
                .toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<BorrowRecordDto>> getRecordsByMember(@PathVariable Integer memberId) {
        List<BorrowRecordDto> list = borrowRecordRepository.findByMember_MemberId(memberId)
                .stream()
                .map(BorrowRecordDto::fromEntity)
                .toList();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/borrow")
    public ResponseEntity<BorrowRecordDto> borrowBook(@RequestParam Integer memberId, @RequestParam Integer bookId) {
        Optional<Member> memberOpt = memberRepository.findById(memberId);
        Optional<Book> bookOpt = bookRepository.findById(bookId);
        if (memberOpt.isEmpty() || bookOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Book book = bookOpt.get();
        if (book.getCopiesAvailable() != null && book.getCopiesAvailable() > 0) {
            book.setCopiesAvailable(book.getCopiesAvailable() - 1);
            if (book.getCopiesAvailable() == 0) {
                book.setStatus(BookStatus.BORROWED);
            }
            bookRepository.save(book);
        } else {
            return ResponseEntity.badRequest().build();
        }

        BorrowRecord record = new BorrowRecord();
        record.setMember(memberOpt.get());
        record.setBook(book);
        LocalDate borrowDate = LocalDate.now();
        record.setBorrowDate(borrowDate);
        record.setDueDate(borrowDate.plusDays(14));
        record.setFine(BigDecimal.ZERO);
        BorrowRecord saved = borrowRecordRepository.save(record);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(BorrowRecordDto.fromEntity(saved));
    }

    @PutMapping("/return/{recordId}")
    public ResponseEntity<BorrowRecordDto> returnBook(@PathVariable Integer recordId) {
        Optional<BorrowRecord> recordOpt = borrowRecordRepository.findById(recordId);
        if (recordOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        BorrowRecord record = recordOpt.get();
        if (record.getReturnDate() == null) {
            LocalDate returnDate = LocalDate.now();
            record.setReturnDate(returnDate);
            if (record.getDueDate() != null && returnDate.isAfter(record.getDueDate())) {
                long daysOverdue = ChronoUnit.DAYS.between(record.getDueDate(), returnDate);
                record.setFine(BigDecimal.valueOf(daysOverdue));
            } else {
                record.setFine(BigDecimal.ZERO);
            }

            Book book = record.getBook();
            if (book.getCopiesAvailable() != null) {
                book.setCopiesAvailable(book.getCopiesAvailable() + 1);
            } else {
                book.setCopiesAvailable(1);
            }
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);

            borrowRecordRepository.save(record);
        }
        return ResponseEntity.ok(BorrowRecordDto.fromEntity(record));
    }
}
