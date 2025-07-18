package com.mohammadnizam.lms.controller.auth;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
}
