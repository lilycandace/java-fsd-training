package com.hexaware.cms.controller;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cms.dto.IncidentDTO;
import com.hexaware.cms.entity.Incident;
import com.hexaware.cms.entity.IncidentAssignment;
import com.hexaware.cms.service.IIncidentService;
import com.hexaware.cms.service.IReportService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("api/incidents")
@SecurityRequirement(name = "Bearer Authentication")
public class IncidentController {

	@Autowired
	IIncidentService incidentService;

	@Autowired
	IReportService reportService;

	@PreAuthorize("hasRole('Citizen')")
	@PostMapping("/createIncident")
	public ResponseEntity<Incident> createIncident(@RequestBody IncidentDTO dto, Authentication authentication) {

		return ResponseEntity.ok(incidentService.createIncident(dto, authentication));
	}

	@PreAuthorize("hasAnyRole('Citizen','Officer','Stationhead')")
	@GetMapping("/getIncident/{id}")
	public ResponseEntity<Incident> getIncident(@PathVariable Integer id) {

		return ResponseEntity.ok(incidentService.getIncidentById(id));
	}

	@PreAuthorize("hasAnyRole('Officer','Stationhead')")
	@GetMapping("/getAllIncidents")
	public ResponseEntity<List<Incident>> getAllIncidents() {

		return ResponseEntity.ok(incidentService.getAllIncidents());
	}

	@GetMapping("/getIncidentByuser/{userId}")
	public ResponseEntity<List<Incident>> getIncidentsByUser(@PathVariable Integer userId) {

		return ResponseEntity.ok(incidentService.getIncidentsByUser(userId));
	}

	@PreAuthorize("hasAnyRole('Citizen','Stationhead')")
	@PutMapping("/updateIncident/{id}")
	public ResponseEntity<Incident> updateIncident(@PathVariable Integer id, @RequestBody IncidentDTO dto) {

		return ResponseEntity.ok(incidentService.updateIncident(id, dto));
	}

	@PreAuthorize("hasRole('Stationhead')")
	@DeleteMapping("/deleteIncident/{id}")
	public ResponseEntity<String> deleteIncident(@PathVariable Integer id) {

		incidentService.deleteIncident(id);

		return ResponseEntity.ok("Incident deleted successfully");
	}

	@PreAuthorize("hasRole('Citizen')")
	@GetMapping("/myIncidents")
	public ResponseEntity<List<Incident>> getMyIncidents(Authentication authentication) {

		String email = authentication.getName();

		return ResponseEntity.ok(incidentService.getIncidentsByEmail(email));
	}

	@PreAuthorize("hasRole('Citizen')")
	@GetMapping("/downloadReport/{incidentId}")
	public ResponseEntity<byte[]> downloadReport(@PathVariable Integer incidentId) {

		ByteArrayInputStream pdf = reportService.generateIncidentReport(incidentId);

		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Incident_" + incidentId + ".pdf")
				.contentType(MediaType.APPLICATION_PDF).body(pdf.readAllBytes());

	}

	@PreAuthorize("hasRole('Stationhead')")
	@GetMapping("/closedIncidents")
	public ResponseEntity<List<Incident>> getClosedIncidents() {

		return ResponseEntity.ok(incidentService.getClosedIncidents());

	}

}
