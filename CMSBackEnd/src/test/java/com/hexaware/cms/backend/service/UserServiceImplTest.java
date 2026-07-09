package com.hexaware.cms.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.cms.dto.UserDTO;
import com.hexaware.cms.entity.User;
import com.hexaware.cms.service.IUserService;

@SpringBootTest
class UserServiceImplTest {

	@Autowired
	private IUserService userService;

	@Test
	void testGetUserById() {

		assertNotNull(userService.getUserById(1));
	}

	@Test
	void testGetAllUsers() {

		assertNotNull(userService.getAllUsers());
	}

	@Test
	void testRegisterUser() {

		UserDTO dto = new UserDTO();

		dto.setFirstName("Lily");
		dto.setLastName("Candace");
		dto.setEmail("lilytest@gmail.com");
		dto.setPassword("pw123");
		dto.setRoleId(1);

		User user = userService.registerUser(dto);

		assertNotNull(user);

	}

	@Test
	void testUpdateUser() {
		Integer userId = 1;

		UserDTO dto = new UserDTO();

		dto.setFirstName("Lily");
		dto.setLastName("Y");
		dto.setEmail("lily@gmail.com");
		dto.setPassword("pw123");
		dto.setRoleId(1);

		User user = userService.updateUser(userId, dto);

		assertNotNull(user);

		assertEquals("Y", user.getLastName());

	}

	@Test
	void testDeleteUser() {
		userService.deleteUser(4);

		assertThrows(NullPointerException.class, ()->{  userService.getUserById(4); });

	}

}
