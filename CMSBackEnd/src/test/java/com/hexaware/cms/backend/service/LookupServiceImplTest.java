package com.hexaware.cms.backend.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class LookupServiceImplTest {

	@Autowired
	private ILookupService lookupService;

	@Test
	void testGetAllRoles() {

		assertNotNull(lookupService.getAllRoles());
	}

	@Test
	void testGetAllIncidentTypes() {

		assertNotNull(lookupService.getAllIncidentTypes());
	}

	@Test
	void testGetAllIncidentStatuses() {

		assertNotNull(lookupService.getAllIncidentStatuses());
	}
}