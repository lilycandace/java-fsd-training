package com.hexaware.cms.backend.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.cms.service.IAssignmentService;

@SpringBootTest
class AssignmentServiceImplTest {

	@Autowired
	private IAssignmentService assignmentService;

	@Test
	void testGetAssignmentsByOfficer() {

		assertNotNull(assignmentService.getAssignmentsByOfficer(1));
	}
}