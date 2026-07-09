package com.hexaware.cms.controller;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cms.dto.AuthResponseDTO;
import com.hexaware.cms.dto.LoginDTO;
import com.hexaware.cms.entity.User;
import com.hexaware.cms.exception.BadCredentialsException;
import com.hexaware.cms.repository.UserRepository;
import com.hexaware.cms.service.IEmailService;
import com.hexaware.cms.service.JwtService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
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
	public ResponseEntity<AuthResponseDTO> authenticateAndGetToken(@RequestBody LoginDTO loginDTO) {

	    logger.info("Login attempt for email: {}", loginDTO.getEmail());

	    try {
	        Authentication authentication = authenticationManager.authenticate(
	                new UsernamePasswordAuthenticationToken(
	                        loginDTO.getEmail(),
	                        loginDTO.getPassword()));

	        User user = userRepository.findByEmail(loginDTO.getEmail())
	                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

	        String token = jwtService.generateToken(user);
	        String subject = "Crime Management System - Login Alert";

	        String body =
	                "Dear " + user.getFirstName() + ",\n\n"
	              + "You have successfully logged into the Crime Management System.\n\n"
	              + "Login Time : "
	              + LocalDateTime.now()
	              + "\n\n"
	              + "If this wasn't you, please contact the administrator immediately.\n\n"
	              + "Regards,\n"
	              + "Crime Management System";

	        emailService.sendEmail(user.getEmail(), subject, body);

	        logger.info("User logged in successfully: {}", loginDTO.getEmail());


	        AuthResponseDTO response = new AuthResponseDTO();

	        response.setToken(token);
	        response.setUserId(user.getUserId());
	        response.setFirstName(user.getFirstName());
	        response.setRole(user.getRole().getRoleName());
	        response.setLastName(user.getLastName());
	        response.setEmail(user.getEmail());

	        return ResponseEntity.ok(response);

	    } catch (BadCredentialsException e) {
	        logger.warn("Failed login attempt for {}", loginDTO.getEmail());
	        throw e;
	    }
	}
}