package com.hexaware.cms.service;

import java.util.List;

import com.hexaware.cms.dto.ChangePasswordDTO;
import com.hexaware.cms.dto.ForgotPasswordDTO;
import com.hexaware.cms.dto.UserDTO;
import com.hexaware.cms.entity.User;

public interface IUserService {
	User registerUser(UserDTO dto);

	UserDTO getUserById(Integer userId);

	List<User> getAllUsers();

	User updateUser(Integer userId, UserDTO dto);

	void deleteUser(Integer userId);
	
	UserDTO getMyProfile(String email);
	List<UserDTO> getAllOfficers();
	List<UserDTO> getAllCitizens();
	
	String forgotPassword(ForgotPasswordDTO dto);
	
	public String changePassword(ChangePasswordDTO dto);

}
