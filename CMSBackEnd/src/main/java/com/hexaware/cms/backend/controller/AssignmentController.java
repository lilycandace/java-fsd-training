package com.hexaware.cms.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cms.backend.dto.AssignmentDTO;
import com.hexaware.cms.backend.entity.IncidentAssignment;
import com.hexaware.cms.backend.service.IAssignmentService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/assignments")
@SecurityRequirement(name = "Bearer Authentication")
public class AssignmentController {
	@Autowired
	IAssignmentService assignmentService;
	
	@PreAuthorize("hasRole('StationHead')")
	@PostMapping("/assignOfficer")
	public ResponseEntity<IncidentAssignment> assignOfficer(@RequestBody AssignmentDTO dto) {

		return ResponseEntity.ok(assignmentService.assignOfficer(dto));
	}
	@PreAuthorize("hasAnyRole('Officer','StationHead')")
	@GetMapping("/getAssignments/{id}")
	public ResponseEntity<List<IncidentAssignment>> getAssignmentsByOfficer(@PathVariable Integer id) {

		return ResponseEntity.ok(assignmentService.getAssignmentsByOfficer(id));
	}

}
