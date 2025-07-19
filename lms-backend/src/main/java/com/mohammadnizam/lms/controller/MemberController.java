package com.mohammadnizam.lms.controller;

import com.mohammadnizam.lms.dto.MemberDto;
import com.mohammadnizam.lms.model.Member;
import com.mohammadnizam.lms.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    private MemberRepository memberRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<MemberDto>> getAllMembers() {
        List<MemberDto> list = memberRepository.findAll()
                .stream()
                .map(MemberDto::fromEntity)
                .toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<MemberDto>> searchMembers(@RequestParam(required = false) String name) {
        String n = name != null ? name : "";
        List<MemberDto> list = memberRepository.findByFullNameContainingIgnoreCase(n)
                .stream()
                .map(MemberDto::fromEntity)
                .toList();
        return ResponseEntity.ok(list);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MemberDto> createMember(@RequestBody Member member) {
        Member saved = memberRepository.save(member);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(MemberDto.fromEntity(saved));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MemberDto> updateMember(@PathVariable Integer id,
                                                  @RequestBody Member member) {
        if (!memberRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        member.setMemberId(id);
        Member updated = memberRepository.save(member);
        return ResponseEntity.ok(MemberDto.fromEntity(updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteMember(@PathVariable Integer id) {
        if (!memberRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        memberRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
