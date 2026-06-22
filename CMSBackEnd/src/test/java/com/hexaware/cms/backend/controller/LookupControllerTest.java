package com.hexaware.cms.backend.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.hexaware.cms.backend.entity.IncidentStatus;
import com.hexaware.cms.backend.entity.IncidentType;
import com.hexaware.cms.backend.entity.Roles;

@SpringBootTest
class LookupControllerTest {

	@Autowired
	RestTemplate restTemplate;

	@Test
	void testGetAllRoles() {

		ResponseEntity<Roles[]> response = restTemplate.getForEntity("http://localhost:8080/api/lookups/getAllRoles", Roles[].class);

		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	void testGetAllIncidentTypes() {

		ResponseEntity<IncidentType[]> response = restTemplate.getForEntity("http://localhost:8080/api/lookups/getAllIncidentTypes",
				IncidentType[].class);

		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	void testGetAllIncidentStatus() {

		ResponseEntity<IncidentStatus[]> response = restTemplate.getForEntity("http://localhost:8080/api/lookups/getAllIncidentStatus",
				IncidentStatus[].class);

		assertEquals(HttpStatus.OK, response.getStatusCode());
	}
}