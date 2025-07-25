package com.mohammadnizam.lms.controller;

import com.mohammadnizam.lms.model.User;
import com.mohammadnizam.lms.model.Role;
import com.mohammadnizam.lms.repository.UserRepository;
import com.mohammadnizam.lms.security.JwtAuthenticationFilter;
import com.mohammadnizam.lms.security.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.mockito.Mockito;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.time.LocalDateTime;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(UserControllerTest.MockConfig.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @MockBean
    private JwtUtil jwtUtil;

    // JwtAuthenticationFilter isn't needed for these tests but declaring it
    // avoids component scan failures when the filter is picked up.
    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @TestConfiguration
    static class MockConfig {
        @Bean
        UserRepository userRepository() {
            return Mockito.mock(UserRepository.class);
        }
    }

    @Test
    void getAllUsers_returnsList() throws Exception {
        User user = new User();
        user.setId(1);
        user.setUsername("john");
        user.setPassword("pass");
        user.setRole(Role.MEMBER);
        user.setCreatedAt(LocalDateTime.now());
        given(userRepository.findAll()).willReturn(List.of(user));

        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].username").value("john"));
    }
}
