package com.hexaware.cms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cms.dto.ChangePasswordDTO;
import com.hexaware.cms.dto.ForgotPasswordDTO;
import com.hexaware.cms.dto.UserDTO;
import com.hexaware.cms.entity.User;
import com.hexaware.cms.service.IUserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

	@Autowired
	IUserService userService;

	@PostMapping("/registerUser")
	public ResponseEntity<User> registerUser(@Valid @RequestBody UserDTO dto) {

		return ResponseEntity.ok(userService.registerUser(dto));
	}

	@PreAuthorize("hasAnyRole('Officer','Stationhead')")
	@GetMapping("/getUserbyId/{id}")
	public ResponseEntity<UserDTO> getUserById(@PathVariable Integer id) {

		return ResponseEntity.ok(userService.getUserById(id));
	}

	@PreAuthorize("hasRole('Stationhead')")
	@GetMapping("/getAllUsers")
	public ResponseEntity<List<User>> getAllUsers() {

		return ResponseEntity.ok(userService.getAllUsers());
	}

	@PreAuthorize("hasAnyRole('Citizen','Stationhead')")
	@PutMapping("/updateUser/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody UserDTO dto) {

		return ResponseEntity.ok(userService.updateUser(id, dto));
	}

	@DeleteMapping("/deleteUser/{id}")
	@PreAuthorize("hasRole('Stationhead')")
	public ResponseEntity<String> deleteUser(@PathVariable Integer id) {

		userService.deleteUser(id);

		return ResponseEntity.ok("User deleted successfully");
	}

	@PreAuthorize("hasAnyRole('Citizen','Officer','Stationhead')")
	@GetMapping("/profile")
	public ResponseEntity<UserDTO> getMyProfile(Authentication authentication) {

		String email = authentication.getName();

		return ResponseEntity.ok(userService.getMyProfile(email));
	}

	@PreAuthorize("hasRole('Stationhead')")
	@GetMapping("/officers")
	public ResponseEntity<List<UserDTO>> getAllOfficers() {

		return ResponseEntity.ok(userService.getAllOfficers());

	}

	@PreAuthorize("hasRole('Stationhead')")
	@PostMapping("/addOfficer")
	public ResponseEntity<User> addOfficer(@RequestBody UserDTO dto) {

		dto.setRoleId(2);

		return ResponseEntity.ok(userService.registerUser(dto));

	}

	@PreAuthorize("hasRole('Stationhead')")
	@DeleteMapping("/deleteOfficer/{id}")
	public ResponseEntity<String> deleteOfficer(@PathVariable Integer id) {

		userService.deleteUser(id);

		return ResponseEntity.ok("Officer deleted successfully.");

	}

	@PreAuthorize("hasRole('Stationhead')")
	@GetMapping("/citizens")
	public ResponseEntity<List<UserDTO>> getAllCitizens() {
		return ResponseEntity.ok(userService.getAllCitizens());
	}

	@PutMapping("/forgot-password")
	public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordDTO dto) {

		return ResponseEntity.ok(userService.forgotPassword(dto));

	}
	@PutMapping("/change-password")
	public ResponseEntity<String> changePassword(
	        @RequestBody ChangePasswordDTO dto) {

	    return ResponseEntity.ok(
	            userService.changePassword(dto)
	    );

	}

}
