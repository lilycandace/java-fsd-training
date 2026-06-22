package com.hexaware.cms.backend.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

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

}
