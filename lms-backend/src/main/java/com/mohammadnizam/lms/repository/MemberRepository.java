package com.mohammadnizam.lms.repository;

import com.mohammadnizam.lms.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    List<Member> findByFullNameContainingIgnoreCase(String name);
}
