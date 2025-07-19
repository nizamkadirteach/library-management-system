package com.mohammadnizam.lms.repository;

import com.mohammadnizam.lms.model.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Integer> {
    List<BorrowRecord> findByMember_MemberId(Integer memberId);

    long countByMember_MemberIdAndReturnDateIsNull(Integer memberId);

    boolean existsByMember_MemberIdAndFineGreaterThan(Integer memberId, BigDecimal amount);

    boolean existsByMember_MemberIdAndDueDateBeforeAndReturnDateIsNull(Integer memberId, LocalDate date);
}
