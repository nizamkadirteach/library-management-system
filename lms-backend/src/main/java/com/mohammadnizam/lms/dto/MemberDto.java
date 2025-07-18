package com.mohammadnizam.lms.dto;

import com.mohammadnizam.lms.model.Member;

import java.time.LocalDate;


public class MemberDto {
    private Integer memberId;
    private String fullName;
    private String contactInfo;
    private String address;
    private LocalDate membershipStart;
    private LocalDate membershipEnd;
    private Integer userId;

    public MemberDto() {
    }

    public MemberDto(Integer memberId, String fullName, String contactInfo, String address,
                     LocalDate membershipStart, LocalDate membershipEnd, Integer userId) {
        this.memberId = memberId;
        this.fullName = fullName;
        this.contactInfo = contactInfo;
        this.address = address;
        this.membershipStart = membershipStart;
        this.membershipEnd = membershipEnd;
        this.userId = userId;
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

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public static MemberDto fromEntity(Member member) {
        if (member == null) {
            return null;
        }
        MemberDto dto = new MemberDto();
        dto.setMemberId(member.getMemberId());
        dto.setFullName(member.getFullName());
        dto.setContactInfo(member.getContactInfo());
        dto.setAddress(member.getAddress());
        dto.setMembershipStart(member.getMembershipStart());
        dto.setMembershipEnd(member.getMembershipEnd());
        if (member.getUser() != null) {
            dto.setUserId(member.getUser().getId());
        }
        return dto;
    }
}
