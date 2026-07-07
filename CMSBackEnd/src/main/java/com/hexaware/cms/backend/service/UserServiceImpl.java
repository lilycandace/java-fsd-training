package com.hexaware.cms.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cms.backend.dto.UserDTO;
import com.hexaware.cms.backend.entity.Roles;
import com.hexaware.cms.backend.entity.User;
import com.hexaware.cms.backend.exception.DuplicateEmailException;
import com.hexaware.cms.backend.exception.RoleNotFoundException;
import com.hexaware.cms.backend.exception.UserNotFoundException;
import com.hexaware.cms.backend.repository.RolesRepository;
import com.hexaware.cms.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserServiceImpl implements IUserService {

	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	IEmailService emailService;

	@Autowired
	UserRepository repo;

	@Autowired
	RolesRepository rolerepo;

	@Override
	public User registerUser(UserDTO dto) {
		// TODO Auto-generated method stub

		logger.info("Registering user with email: {}", dto.getEmail());

		if (repo.findByEmail(dto.getEmail()).isPresent()) {
			logger.warn("Registration failed. Email already exists: {}", dto.getEmail());
			throw new DuplicateEmailException("Email already exists");
		}

		Roles role = rolerepo.findById(dto.getRoleId()).orElseThrow(() -> new RoleNotFoundException("Role not found"));

		User user = new User();
		user.setFirstName(dto.getFirstName());
		user.setMiddleName(dto.getMiddleName());
		user.setLastName(dto.getLastName());
		user.setEmail(dto.getEmail());
		user.setPassword(dto.getPassword());
		user.setPhone(dto.getPhone());
		user.setAddress(dto.getAddress());
		user.setDob(dto.getDob());
		user.setAadhaarNo(dto.getAadhaarNo());
		user.setPanNo(dto.getPanNo());
		user.setProfilePicture(dto.getProfilePicture());
		user.setRole(role);

		User savedUser = repo.save(user);

		logger.info("User registered successfully with ID: {}", savedUser.getUserId());
		String subject = "Crime Management System - Registration Successful";

		String body =
		        "Dear " + savedUser.getFirstName() + ",\n\n"
		      + "Welcome to the Crime Management System.\n\n"
		      + "Your account has been created successfully.\n\n"
		      + "Registered Email : " + savedUser.getEmail() + "\n\n"
		      + "You can now log in and report incidents.\n\n"
		      + "Regards,\n"
		      + "Crime Management System";

		emailService.sendEmail(savedUser.getEmail(), subject, body);
		return savedUser;
	}

	@Override
	public UserDTO getUserById(Integer userId) {
		logger.info("Fetching user with ID: {}", userId);
		User user = repo.findById(userId).orElseThrow(() -> {
			logger.error("User not found with ID: {}", userId);
			return new UserNotFoundException("User not found with id " + userId);
		});

		UserDTO dto = new UserDTO();

		dto.setFirstName(user.getFirstName());
		dto.setMiddleName(user.getMiddleName());
		dto.setLastName(user.getLastName());
		dto.setEmail(user.getEmail());
		dto.setPhone(user.getPhone());
		dto.setAddress(user.getAddress());
		dto.setDob(user.getDob());
		dto.setAadhaarNo(user.getAadhaarNo());
		dto.setPanNo(user.getPanNo());
		dto.setProfilePicture(user.getProfilePicture());

		dto.setRoleId(user.getRole().getRoleId());

		return dto;
	}

	@Override
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public User updateUser(Integer userId, UserDTO dto) {
		// TODO Auto-generated method stub
		logger.info("Updating user with ID: {}", userId);
		User user = repo.findById(userId).orElseThrow(() -> {
			logger.error("User not found with ID: {}", userId);
			return new UserNotFoundException("User not found with id " + userId);
		});
		Roles role = user.getRole();
		user.setFirstName(dto.getFirstName());
		user.setMiddleName(dto.getMiddleName());
		user.setLastName(dto.getLastName());
		user.setEmail(dto.getEmail());
//		user.setPassword(dto.getPassword());
		if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
		    user.setPassword(dto.getPassword());
		}
		user.setPhone(dto.getPhone());
		user.setAddress(dto.getAddress());
		user.setDob(dto.getDob());
		user.setAadhaarNo(dto.getAadhaarNo());
		user.setPanNo(dto.getPanNo());
		user.setProfilePicture(dto.getProfilePicture());
		user.setRole(role);
		User savedUser = repo.save(user);
		logger.info("User updated successfully.");
		return savedUser;

	}

	@Override
	public void deleteUser(Integer userId) {
		// TODO Auto-generated method stub
		logger.info("Deleting user with ID: {}", userId);
		User user = repo.findById(userId).orElseThrow(() -> {
			logger.error("User not found with ID: {}", userId);
			return new UserNotFoundException("User not found with id " + userId);
		});
		repo.delete(user);
		logger.info("User deleted successfully with ID: {}", userId);
	}

	@Override
	public UserDTO getMyProfile(String email) {

	    User user = repo.findByEmail(email)
	            .orElseThrow(() ->
	                    new UserNotFoundException("User not found"));

	    UserDTO dto = new UserDTO();
	    dto.setUserId(user.getUserId());
	    dto.setFirstName(user.getFirstName());
	    dto.setMiddleName(user.getMiddleName());
	    dto.setLastName(user.getLastName());
	    dto.setEmail(user.getEmail());
	    dto.setPhone(user.getPhone());
	    dto.setAddress(user.getAddress());
	    dto.setDob(user.getDob());
	    dto.setAadhaarNo(user.getAadhaarNo());
	    dto.setPanNo(user.getPanNo());
	    dto.setProfilePicture(user.getProfilePicture());
	    dto.setRoleId(user.getRole().getRoleId());

	    return dto;
	}
	@Override
	public List<UserDTO> getAllOfficers() {

	    List<User> officers =
	            repo.findByRoleRoleName("Officer");

	    return officers.stream()

	            .map(user -> {

	                UserDTO dto = new UserDTO();

	                dto.setUserId(user.getUserId());

	                dto.setFirstName(user.getFirstName());

	                dto.setLastName(user.getLastName());

	                dto.setEmail(user.getEmail());

	                dto.setPhone(user.getPhone());

	                dto.setRoleId(user.getRole().getRoleId());

	                return dto;

	            })

	            .toList();

	}

	@Override
	public List<UserDTO> getAllCitizens() {
		// TODO Auto-generated method stub
		List<User> citizens =
	            repo.findByRoleRoleName("Citizen");

	    return citizens.stream()

	            .map(user -> {

	                UserDTO dto = new UserDTO();

	                dto.setUserId(user.getUserId());

	                dto.setFirstName(user.getFirstName());

	                dto.setLastName(user.getLastName());

	                dto.setEmail(user.getEmail());

	                dto.setPhone(user.getPhone());

	                dto.setRoleId(user.getRole().getRoleId());

	                return dto;

	            })

	            .toList();
	}

}
