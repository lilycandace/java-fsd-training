package com.hexaware.cms.backend.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.hexaware.cms.backend.entity.IncidentStatusHistory;

@SpringBootTest
class StatusHistoryControllerTest {

	@Autowired
	RestTemplate restTemplate;

	@Test
	void testGetHistory() {

		ResponseEntity<IncidentStatusHistory[]> response = restTemplate.getForEntity("http://localhost:8080/api/statusHistory/getHistory/1",
				IncidentStatusHistory[].class);

		assertEquals(HttpStatus.OK, response.getStatusCode());
	}
}