package com.mohammadnizam.lms.repository;

import com.mohammadnizam.lms.model.Reservation;
import com.mohammadnizam.lms.model.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findByBook_BookIdAndStatus(Integer bookId, ReservationStatus status);
    Optional<Reservation> findByBook_BookIdAndMember_MemberIdAndStatus(Integer bookId, Integer memberId, ReservationStatus status);
    boolean existsByBook_BookIdAndStatus(Integer bookId, ReservationStatus status);
}
