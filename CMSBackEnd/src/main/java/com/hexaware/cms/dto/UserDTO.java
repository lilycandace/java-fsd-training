package com.hexaware.cms.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	
	private Integer userId;

    @NotBlank(message = "First Name is required")
    private String firstName;

    private String middleName;

    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "Phone number must contain 10 digits"
    )
    private String phone;

    private String address;

    private LocalDate dob;

    @Pattern(
        regexp = "^[0-9]{12}$",
        message = "Aadhaar must contain 12 digits"
    )
    private String aadhaarNo;

    private String panNo;

    private String profilePicture;

    private Integer roleId;
}

