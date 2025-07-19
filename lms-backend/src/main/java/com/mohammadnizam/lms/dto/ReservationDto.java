package com.mohammadnizam.lms.dto;

import com.mohammadnizam.lms.model.Reservation;
import com.mohammadnizam.lms.model.ReservationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {
    private Integer reservationId;
    private Integer memberId;
    private Integer bookId;
    private LocalDate reservationDate;
    private ReservationStatus status;

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
