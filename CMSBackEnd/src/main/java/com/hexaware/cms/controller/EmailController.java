package com.hexaware.cms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hexaware.cms.service.IEmailService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/email")
@SecurityRequirement(name = "Bearer Authentication")
public class EmailController {

    @Autowired
    private IEmailService emailService;

    @GetMapping("/test")
    public ResponseEntity<String> sendTestEmail() {

        emailService.sendEmail(
                "lilycandace24@gmail.com",
                "Crime Management System",
                "Congratulations! Email notifications are working successfully.");

        return ResponseEntity.ok("Email sent successfully.");
    }
}