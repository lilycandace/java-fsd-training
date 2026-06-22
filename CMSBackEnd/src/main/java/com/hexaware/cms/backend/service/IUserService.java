package com.hexaware.cms.backend.service;

import java.util.List;

import com.hexaware.cms.backend.dto.UserDTO;
import com.hexaware.cms.backend.entity.User;

public interface IUserService {
	User registerUser(UserDTO dto);

	UserDTO getUserById(Integer userId);

	List<User> getAllUsers();

	User updateUser(Integer userId, UserDTO dto);

	void deleteUser(Integer userId);

}
