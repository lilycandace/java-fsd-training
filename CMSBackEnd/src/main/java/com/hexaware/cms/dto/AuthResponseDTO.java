package com.hexaware.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {

    private String token;

    private Integer userId;

    private String firstName;

    private String lastName;

    private String email;

    private String role;
}