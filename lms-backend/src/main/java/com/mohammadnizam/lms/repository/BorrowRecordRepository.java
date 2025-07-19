package com.mohammadnizam.lms.repository;

import com.mohammadnizam.lms.model.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Integer> {
    List<BorrowRecord> findByMember_MemberId(Integer memberId);

    long countByMember_MemberIdAndReturnDateIsNull(Integer memberId);

    boolean existsByMember_MemberIdAndFineGreaterThan(Integer memberId, BigDecimal amount);

    boolean existsByMember_MemberIdAndDueDateBeforeAndReturnDateIsNull(Integer memberId, LocalDate date);

    @Query("SELECT COALESCE(SUM(br.fine), 0) FROM BorrowRecord br WHERE br.member.memberId = :memberId AND br.fine > 0")
    BigDecimal sumOutstandingFinesByMemberId(@Param("memberId") Integer memberId);
}
