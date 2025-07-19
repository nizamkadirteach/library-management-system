package com.mohammadnizam.lms.repository;

import com.mohammadnizam.lms.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    List<Member> findByFullNameContainingIgnoreCase(String name);

    Optional<Member> findByUser_Username(String username);
}
