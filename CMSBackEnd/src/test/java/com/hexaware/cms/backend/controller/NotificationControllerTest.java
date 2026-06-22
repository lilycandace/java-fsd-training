package com.hexaware.cms.backend.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.hexaware.cms.backend.entity.Notification;

@SpringBootTest
class NotificationControllerTest {

	@Autowired
	RestTemplate restTemplate;

	@Test
	void testGetNotifications() {

		ResponseEntity<Notification[]> response = restTemplate.getForEntity("http://localhost:8080/api/notifications/1",
				Notification[].class);

		assertEquals(HttpStatus.OK, response.getStatusCode());
	}
}