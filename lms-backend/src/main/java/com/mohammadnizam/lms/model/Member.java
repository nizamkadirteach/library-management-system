package com.mohammadnizam.lms.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "members")
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

    public Member() {
    }

    public Member(Integer memberId, String fullName, String contactInfo, String address,
                  LocalDate membershipStart, LocalDate membershipEnd, User user) {
        this.memberId = memberId;
        this.fullName = fullName;
        this.contactInfo = contactInfo;
        this.address = address;
        this.membershipStart = membershipStart;
        this.membershipEnd = membershipEnd;
        this.user = user;
    }

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDate getMembershipStart() {
        return membershipStart;
    }

    public void setMembershipStart(LocalDate membershipStart) {
        this.membershipStart = membershipStart;
    }

    public LocalDate getMembershipEnd() {
        return membershipEnd;
    }

    public void setMembershipEnd(LocalDate membershipEnd) {
        this.membershipEnd = membershipEnd;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
