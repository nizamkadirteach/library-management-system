package com.mohammadnizam.lms.controller.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String username;
    private String password;
    private String fullName;
    private String contactInfo;
    private String address;
    private LocalDate membershipStart;
    private LocalDate membershipEnd;
}
