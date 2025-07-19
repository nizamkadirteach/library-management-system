package com.mohammadnizam.lms.controller;

import com.mohammadnizam.lms.dto.UserDto;
import com.mohammadnizam.lms.model.User;
import com.mohammadnizam.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> list = userRepository.findAll()
                .stream()
                .map(UserDto::fromEntity)
                .toList();
        return ResponseEntity.ok(list);
    }
}
