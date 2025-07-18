package com.mohammadnizam.lms.controller;

import com.mohammadnizam.lms.model.Member;
import com.mohammadnizam.lms.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    private MemberRepository memberRepository;

    @GetMapping
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    @PostMapping
    public Member createMember(@RequestBody Member member) {
        return memberRepository.save(member);
    }

    @PutMapping("/{id}")
    public Member updateMember(@PathVariable Integer id, @RequestBody Member member) {
        member.setMemberId(id);
        return memberRepository.save(member);
    }

    @DeleteMapping("/{id}")
    public void deleteMember(@PathVariable Integer id) {
        memberRepository.deleteById(id);
    }
}
