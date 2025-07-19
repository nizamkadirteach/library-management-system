package com.mohammadnizam.lms.controller;

import com.mohammadnizam.lms.dto.BorrowRecordDto;
import com.mohammadnizam.lms.model.Book;
import com.mohammadnizam.lms.model.BookStatus;
import com.mohammadnizam.lms.model.BorrowRecord;
import com.mohammadnizam.lms.model.Member;
import com.mohammadnizam.lms.model.Reservation;
import com.mohammadnizam.lms.model.ReservationStatus;
import com.mohammadnizam.lms.repository.BookRepository;
import com.mohammadnizam.lms.repository.BorrowRecordRepository;
import com.mohammadnizam.lms.repository.MemberRepository;
import com.mohammadnizam.lms.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.math.BigDecimal;
import java.math.RoundingMode;
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

    @Autowired
    private ReservationRepository reservationRepository;

    @GetMapping
    public ResponseEntity<List<BorrowRecordDto>> getAllRecords() {
        List<BorrowRecordDto> list = borrowRecordRepository.findAll()
                .stream()
                .map(BorrowRecordDto::fromEntity)
                .toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<BorrowRecordDto>> getOverdueRecords() {
        List<BorrowRecordDto> list = borrowRecordRepository
                .findByDueDateBeforeAndReturnDateIsNull(LocalDate.now())
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

    @GetMapping("/my")
    public ResponseEntity<List<BorrowRecordDto>> getMyRecords(@AuthenticationPrincipal(expression = "username") String username) {
        Optional<Member> memberOpt = memberRepository.findByUser_Username(username);
        if (memberOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        List<BorrowRecordDto> list = borrowRecordRepository.findByMember_MemberId(memberOpt.get().getMemberId())
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

        long active = borrowRecordRepository.countByMember_MemberIdAndReturnDateIsNull(memberId);
        BigDecimal totalFine = borrowRecordRepository.sumOutstandingFinesByMemberId(memberId);
        if (totalFine == null) {
            totalFine = BigDecimal.ZERO;
        }
        boolean hasOverdue = borrowRecordRepository.existsByMember_MemberIdAndDueDateBeforeAndReturnDateIsNull(memberId, LocalDate.now());
        if (active >= 3 || totalFine.compareTo(BigDecimal.valueOf(10)) > 0 || hasOverdue) {
            return ResponseEntity.badRequest().build();
        }

        boolean hasReservation = reservationRepository.existsByBook_BookIdAndStatus(bookId, ReservationStatus.ACTIVE);
        if (hasReservation) {
            Optional<Reservation> ownReservation = reservationRepository
                    .findByBook_BookIdAndMember_MemberIdAndStatus(bookId, memberId, ReservationStatus.ACTIVE);
            if (ownReservation.isPresent()) {
                Reservation r = ownReservation.get();
                r.setStatus(ReservationStatus.FULFILLED);
                reservationRepository.save(r);
            } else {
                return ResponseEntity.badRequest().build();
            }
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
        record.setRenewalCount(0);
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
                BigDecimal fine = BigDecimal.valueOf(daysOverdue * 0.5).setScale(2, RoundingMode.HALF_UP);
                if (fine.compareTo(BigDecimal.valueOf(20)) > 0) {
                    fine = BigDecimal.valueOf(20);
                }
                record.setFine(fine);
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

    @PutMapping("/renew/{recordId}")
    public ResponseEntity<BorrowRecordDto> renewBook(@PathVariable Integer recordId) {
        Optional<BorrowRecord> recordOpt = borrowRecordRepository.findById(recordId);
        if (recordOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        BorrowRecord record = recordOpt.get();
        if (record.getReturnDate() != null) {
            return ResponseEntity.badRequest().build();
        }
        if (record.getRenewalCount() == null) {
            record.setRenewalCount(0);
        }
        if (record.getRenewalCount() >= 2) {
            return ResponseEntity.badRequest().build();
        }
        record.setRenewalCount(record.getRenewalCount() + 1);
        record.setDueDate(record.getDueDate().plusDays(14));
        borrowRecordRepository.save(record);
        return ResponseEntity.ok(BorrowRecordDto.fromEntity(record));
    }
}
