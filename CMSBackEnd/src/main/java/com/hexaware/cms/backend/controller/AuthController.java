package com.hexaware.cms.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cms.backend.dto.LoginDTO;
import com.hexaware.cms.backend.entity.User;
import com.hexaware.cms.backend.repository.UserRepository;
import com.hexaware.cms.backend.service.IEmailService;
import com.hexaware.cms.backend.service.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	private static final Logger logger =
	        LoggerFactory.getLogger(AuthController.class);
	@Autowired
	IEmailService emailService;


	@Autowired
	private JwtService jwtService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@PostMapping("/login")
	public ResponseEntity<?> authenticateAndGetToken(@RequestBody LoginDTO loginDTO) {

	    logger.info("Login attempt for email: {}", loginDTO.getEmail());

	    try {
	        Authentication authentication = authenticationManager.authenticate(
	                new UsernamePasswordAuthenticationToken(
	                        loginDTO.getEmail(),
	                        loginDTO.getPassword()));

	        User user = userRepository.findByEmail(loginDTO.getEmail())
	                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

	        String token = jwtService.generateToken(user);

	        logger.info("User logged in successfully: {}", loginDTO.getEmail());

	        emailService.sendEmail(
	                user.getEmail(),
	                "Login Alert",
	                "Hello " + user.getFirstName()
	                + ",\n\nYou have successfully logged into the Crime Management System.");

	        return ResponseEntity.ok(token);


	    } catch (Exception e) {

	        logger.warn("Failed login attempt for {}", loginDTO.getEmail());

	        throw e;
	    }
	}
}