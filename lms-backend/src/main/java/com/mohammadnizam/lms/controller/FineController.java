package com.mohammadnizam.lms.controller;

import com.mohammadnizam.lms.repository.BorrowRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/fines")
public class FineController {

    @Autowired
    private BorrowRecordRepository borrowRecordRepository;

    @GetMapping("/{memberId}")
    public ResponseEntity<BigDecimal> getOutstandingFines(@PathVariable Integer memberId) {
        BigDecimal total = borrowRecordRepository.sumOutstandingFinesByMemberId(memberId);
        if (total == null) {
            total = BigDecimal.ZERO;
        }
        return ResponseEntity.ok(total);
    }
}
