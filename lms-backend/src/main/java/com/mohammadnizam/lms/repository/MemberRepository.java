package com.mohammadnizam.lms.repository;

import com.mohammadnizam.lms.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {
}
