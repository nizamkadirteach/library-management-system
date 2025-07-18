package com.mohammadnizam.lms.repository;

import com.mohammadnizam.lms.model.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Integer> {
    List<BorrowRecord> findByMember_MemberId(Integer memberId);
}
