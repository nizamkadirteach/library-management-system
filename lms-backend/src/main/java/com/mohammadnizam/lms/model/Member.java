package com.mohammadnizam.lms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "members")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Integer memberId;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "contact_info")
    private String contactInfo;

    private String address;

    @Column(name = "membership_start")
    private LocalDate membershipStart;

    @Column(name = "membership_end")
    private LocalDate membershipEnd;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
