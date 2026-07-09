package com.hexaware.cms.controller;

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

import com.hexaware.cms.dto.AssignmentDTO;
import com.hexaware.cms.dto.OfficerWorkloadDTO;
import com.hexaware.cms.dto.VerifyCaseDTO;
import com.hexaware.cms.entity.IncidentAssignment;
import com.hexaware.cms.service.IAssignmentService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/assignments")
@SecurityRequirement(name = "Bearer Authentication")
public class AssignmentController {
	@Autowired
	IAssignmentService assignmentService;

	@PreAuthorize("hasRole('Stationhead')")
	@PostMapping("/assignOfficer")
	public ResponseEntity<IncidentAssignment> assignOfficer(@RequestBody AssignmentDTO dto) {

		return ResponseEntity.ok(assignmentService.assignOfficer(dto));
	}

	@PreAuthorize("hasAnyRole('Officer','Stationhead')")
	@GetMapping("/getAssignments/{id}")
	public ResponseEntity<List<IncidentAssignment>> getAssignmentsByOfficer(@PathVariable Integer id) {

		return ResponseEntity.ok(assignmentService.getAssignmentsByOfficer(id));
	}

	@PreAuthorize("hasAnyRole('Officer','Citizen','Stationhead')")
	@GetMapping("/incident/{incidentId}")
	public ResponseEntity<IncidentAssignment> getAssignmentByIncident(@PathVariable Integer incidentId) {

		return ResponseEntity.ok(assignmentService.getAssignmentByIncident(incidentId));

	}

	@PreAuthorize("hasRole('Stationhead')")
	@GetMapping("/closedAssignments")
	public ResponseEntity<List<VerifyCaseDTO>> getClosedAssignments() {

		return ResponseEntity.ok(assignmentService.getClosedAssignments());

	}
	@PreAuthorize("hasRole('Stationhead')")
	@GetMapping("/workloads")
	public ResponseEntity<List<OfficerWorkloadDTO>> getOfficerWorkloads() {

	    return ResponseEntity.ok(
	            assignmentService.getOfficerWorkloads());

	}

}
