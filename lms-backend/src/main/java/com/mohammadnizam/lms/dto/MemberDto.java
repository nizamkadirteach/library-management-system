package com.mohammadnizam.lms.dto;

import com.mohammadnizam.lms.model.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {
    private Integer memberId;
    private String fullName;
    private String contactInfo;
    private String address;
    private LocalDate membershipStart;
    private LocalDate membershipEnd;
    private Integer userId;
    private long borrowCount;
    private BigDecimal fineAmount;

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
        dto.setBorrowCount(0);
        dto.setFineAmount(BigDecimal.ZERO);
        return dto;
    }
}
