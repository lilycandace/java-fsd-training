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

import com.hexaware.cms.backend.entity.Incident;

@SpringBootTest
class IncidentControllerTest {

	@Autowired
	RestTemplate restTemplate;

	@Test
	void testGetIncidentById() {

		Incident incident = restTemplate.getForObject("http://localhost:8080/api/incidents/getIncident/1", Incident.class);

		assertNotNull(incident);
	}

	@Test
	void testGetAllIncidents() {

		ResponseEntity<Incident[]> response = restTemplate.getForEntity("http://localhost:8080/api/incidents/getAllIncidents",
				Incident[].class);

		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	void testGetIncidentByUser() {

		ResponseEntity<Incident[]> response = restTemplate.getForEntity("http://localhost:8080/api/incidents/getIncidentByuser/1",
				Incident[].class);

		assertEquals(HttpStatus.OK, response.getStatusCode());
	}
}