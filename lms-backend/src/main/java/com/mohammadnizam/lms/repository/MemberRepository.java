package com.mohammadnizam.lms.repository;

import com.mohammadnizam.lms.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    List<Member> findByFullNameContainingIgnoreCase(String name);

    Optional<Member> findByUser_Username(String username);

    @Query("SELECT COUNT(br) FROM BorrowRecord br WHERE br.member.memberId = :memberId AND br.returnDate IS NULL")
    long countActiveBorrows(@Param("memberId") Integer memberId);

    @Query("SELECT COALESCE(SUM(br.fine),0) FROM BorrowRecord br WHERE br.member.memberId = :memberId AND br.fine > 0")
    java.math.BigDecimal sumOutstandingFines(@Param("memberId") Integer memberId);
}
