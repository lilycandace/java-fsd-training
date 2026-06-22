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

@Service
public class UserServiceImpl implements IUserService {

	@Autowired
	UserRepository repo;

	@Autowired
	RolesRepository rolerepo;

	@Override
	public User registerUser(UserDTO dto) {
		// TODO Auto-generated method stub

		if (repo.findByEmail(dto.getEmail()).isPresent()) {
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

		return repo.save(user);
	}

	@Override
	public UserDTO getUserById(Integer userId) {

		User user = repo.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found with id " + userId));

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

		return repo.save(user);

	}

	@Override
	public void deleteUser(Integer userId) {
		// TODO Auto-generated method stub
		repo.deleteById(userId);

	}

}
