package com.mohammadnizam.lms.dto;

import com.mohammadnizam.lms.model.User;


public class UserDto {
    private Integer id;
    private String username;
    private String role;

    public UserDto() {
    }

    public UserDto(Integer id, String username, String role) {
        this.id = id;
        this.username = username;
        this.role = role;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public static UserDto fromEntity(User user) {
        if (user == null) {
            return null;
        }
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        if (user.getRole() != null) {
            dto.setRole(user.getRole().name());
        }
        return dto;
    }
}
