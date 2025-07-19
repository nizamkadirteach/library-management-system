package com.mohammadnizam.lms.controller;

import com.mohammadnizam.lms.dto.ReservationDto;
import com.mohammadnizam.lms.model.Book;
import com.mohammadnizam.lms.model.Member;
import com.mohammadnizam.lms.model.Reservation;
import com.mohammadnizam.lms.model.ReservationStatus;
import com.mohammadnizam.lms.repository.BookRepository;
import com.mohammadnizam.lms.repository.MemberRepository;
import com.mohammadnizam.lms.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public ResponseEntity<List<ReservationDto>> getAll() {
        List<ReservationDto> list = reservationRepository.findAll()
                .stream()
                .map(ReservationDto::fromEntity)
                .toList();
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<ReservationDto> reserveBook(@RequestParam Integer memberId,
                                                      @RequestParam Integer bookId) {
        Optional<Member> memberOpt = memberRepository.findById(memberId);
        Optional<Book> bookOpt = bookRepository.findById(bookId);
        if (memberOpt.isEmpty() || bookOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Reservation reservation = new Reservation();
        reservation.setMember(memberOpt.get());
        reservation.setBook(bookOpt.get());
        reservation.setReservationDate(LocalDate.now());
        reservation.setStatus(ReservationStatus.ACTIVE);
        Reservation saved = reservationRepository.save(reservation);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ReservationDto.fromEntity(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Integer id) {
        Optional<Reservation> resOpt = reservationRepository.findById(id);
        if (resOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Reservation reservation = resOpt.get();
        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
        return ResponseEntity.noContent().build();
    }
}
