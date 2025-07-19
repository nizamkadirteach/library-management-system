package com.mohammadnizam.lms.dto;

import com.mohammadnizam.lms.model.Reservation;
import com.mohammadnizam.lms.model.ReservationStatus;

import java.time.LocalDate;

public class ReservationDto {
    private Integer reservationId;
    private Integer memberId;
    private Integer bookId;
    private LocalDate reservationDate;
    private ReservationStatus status;

    public ReservationDto() {}

    public ReservationDto(Integer reservationId, Integer memberId, Integer bookId, LocalDate reservationDate, ReservationStatus status) {
        this.reservationId = reservationId;
        this.memberId = memberId;
        this.bookId = bookId;
        this.reservationDate = reservationDate;
        this.status = status;
    }

    public Integer getReservationId() {
        return reservationId;
    }

    public void setReservationId(Integer reservationId) {
        this.reservationId = reservationId;
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

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }

    public ReservationStatus getStatus() {
        return status;
    }

    public void setStatus(ReservationStatus status) {
        this.status = status;
    }

    public static ReservationDto fromEntity(Reservation reservation) {
        if (reservation == null) {
            return null;
        }
        ReservationDto dto = new ReservationDto();
        dto.setReservationId(reservation.getReservationId());
        if (reservation.getMember() != null) {
            dto.setMemberId(reservation.getMember().getMemberId());
        }
        if (reservation.getBook() != null) {
            dto.setBookId(reservation.getBook().getBookId());
        }
        dto.setReservationDate(reservation.getReservationDate());
        dto.setStatus(reservation.getStatus());
        return dto;
    }
}
