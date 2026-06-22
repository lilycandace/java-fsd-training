package com.hexaware.cms.backend.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.hexaware.cms.backend.dto.UserDTO;
import com.hexaware.cms.backend.entity.User;

@SpringBootTest
class UserControllerTest {

	@Autowired
	RestTemplate restTemplate;

	@Test
	void testGetUserById() {

		UserDTO user = restTemplate.getForObject("http://localhost:8080/api/users/getUserbyId/1", UserDTO.class);

		assertNotNull(user);
	}

	@Test
	void testGetAllUsers() {

		ResponseEntity<User[]> response = restTemplate.getForEntity("http://localhost:8080/api/users/getAllUsers", User[].class);

		assertEquals(HttpStatus.OK, response.getStatusCode());
	}
}