package com.hexaware.cms.backend.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.cms.service.IIncidentService;

@SpringBootTest
class IncidentServiceImplTest {

	@Autowired
	private IIncidentService incidentService;

	@Test
	void testGetIncidentById() {

		assertNotNull(incidentService.getIncidentById(1));
	}

	@Test
	void testGetAllIncidents() {

		assertNotNull(incidentService.getAllIncidents());
	}

	@Test
	void testGetIncidentsByUser() {

		assertNotNull(incidentService.getIncidentsByUser(1));
	}
}