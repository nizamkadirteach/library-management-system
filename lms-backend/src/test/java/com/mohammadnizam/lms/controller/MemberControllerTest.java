package com.mohammadnizam.lms.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohammadnizam.lms.model.Member;
import com.mohammadnizam.lms.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MemberController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(MemberControllerTest.MockConfig.class)
class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @TestConfiguration
    static class MockConfig {
        @Bean
        MemberRepository memberRepository() {
            return Mockito.mock(MemberRepository.class);
        }
    }

    @Test
    void getAllMembers_returnsList() throws Exception {
        Member member = new Member();
        member.setMemberId(1);
        member.setFullName("John Doe");
        member.setContactInfo("123");
        member.setAddress("Addr");
        member.setMembershipStart(LocalDate.now());
        member.setMembershipEnd(LocalDate.now().plusDays(1));
        given(memberRepository.findAll()).willReturn(List.of(member));

        mockMvc.perform(get("/api/members"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].fullName").value("John Doe"));
    }

    @Test
    void createMember_returnsCreated() throws Exception {
        Member member = new Member();
        member.setMemberId(1);
        member.setFullName("Jane");
        given(memberRepository.save(any(Member.class))).willReturn(member);

        mockMvc.perform(post("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(member)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.memberId").value(1));
    }

    @Test
    void searchMembers_returnsList() throws Exception {
        Member member = new Member();
        member.setMemberId(2);
        member.setFullName("Alice");
        given(memberRepository.findByFullNameContainingIgnoreCase("Alice"))
                .willReturn(List.of(member));

        mockMvc.perform(get("/api/members/search").param("name", "Alice"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].fullName").value("Alice"));
    }
}
