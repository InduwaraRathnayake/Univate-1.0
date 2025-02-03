package com.univate.univate01.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}