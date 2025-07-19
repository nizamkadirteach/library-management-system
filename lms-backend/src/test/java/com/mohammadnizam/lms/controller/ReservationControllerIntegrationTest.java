package com.mohammadnizam.lms.controller;

import com.mohammadnizam.lms.model.*;
import com.mohammadnizam.lms.repository.*;
import com.mohammadnizam.lms.security.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class ReservationControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    private String authHeader(String username) {
        String token = jwtUtil.generateToken(username);
        return "Bearer " + token;
    }

    private Member createMember(String username) {
        User user = new User();
        user.setUsername(username);
        user.setPassword("pass");
        user.setRole(Role.MEMBER);
        user.setCreatedAt(LocalDateTime.now());
        user = userRepository.save(user);

        Member member = new Member();
        member.setFullName("Test Member");
        member.setAddress("Address");
        member.setContactInfo("123");
        member.setMembershipStart(LocalDate.now());
        member.setMembershipEnd(LocalDate.now());
        member.setUser(user);
        return memberRepository.save(member);
    }

    @Test
    void createReservation_createsRecord() throws Exception {
        Member member = memberRepository.findByUser_Username("seeduser").orElseThrow();
        Book book = bookRepository.findAll().get(0);

        mockMvc.perform(post("/api/reservations")
                        .param("memberId", member.getMemberId().toString())
                        .param("bookId", book.getBookId().toString())
                        .header("Authorization", authHeader("seeduser")))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.memberId").value(member.getMemberId()))
                .andExpect(jsonPath("$.bookId").value(book.getBookId()))
                .andExpect(jsonPath("$.status").value("ACTIVE"));

        assertThat(reservationRepository.count()).isEqualTo(1);
    }

    @Test
    void cancelReservation_marksCancelled() throws Exception {
        Member member = memberRepository.findByUser_Username("seeduser").orElseThrow();
        Book book = bookRepository.findAll().get(0);
        Reservation res = new Reservation();
        res.setMember(member);
        res.setBook(book);
        res.setReservationDate(LocalDate.now());
        res.setStatus(ReservationStatus.ACTIVE);
        res = reservationRepository.save(res);

        mockMvc.perform(delete("/api/reservations/" + res.getReservationId())
                        .header("Authorization", authHeader("seeduser")))
                .andExpect(status().isNoContent());

        Reservation updated = reservationRepository.findById(res.getReservationId()).orElseThrow();
        assertThat(updated.getStatus()).isEqualTo(ReservationStatus.CANCELLED);
    }

    @Test
    void getMyReservations_returnsOnlyUserReservations() throws Exception {
        Member member1 = memberRepository.findByUser_Username("seeduser").orElseThrow();
        Book book1 = bookRepository.findAll().get(0);
        Book book2 = bookRepository.findAll().get(1);

        Reservation r1 = new Reservation(null, member1, book1, LocalDate.now(), ReservationStatus.ACTIVE);
        Reservation r2 = new Reservation(null, member1, book2, LocalDate.now(), ReservationStatus.ACTIVE);
        reservationRepository.save(r1);
        reservationRepository.save(r2);

        Member other = createMember("otheruser");
        Reservation otherRes = new Reservation(null, other, book1, LocalDate.now(), ReservationStatus.ACTIVE);
        reservationRepository.save(otherRes);

        mockMvc.perform(get("/api/reservations/my")
                        .header("Authorization", authHeader("seeduser")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }
}

