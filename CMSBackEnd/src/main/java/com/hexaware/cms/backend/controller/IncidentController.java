package com.hexaware.cms.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cms.backend.dto.IncidentDTO;
import com.hexaware.cms.backend.entity.Incident;
import com.hexaware.cms.backend.service.IIncidentService;

@RestController
@RequestMapping("api/incidents")
public class IncidentController {

	@Autowired
	IIncidentService incidentService;

	@PostMapping("/createIncident")
	public ResponseEntity<Incident> createIncident(@RequestBody IncidentDTO dto) {

		return ResponseEntity.ok(incidentService.createIncident(dto));
	}

	@GetMapping("/getIncident/{id}")
	public ResponseEntity<Incident> getIncident(@PathVariable Integer id) {

		return ResponseEntity.ok(incidentService.getIncidentById(id));
	}

	@GetMapping("/getAllIncidents")
	public ResponseEntity<List<Incident>> getAllIncidents() {

		return ResponseEntity.ok(incidentService.getAllIncidents());
	}

	@GetMapping("/getIncidentByuser/{userId}")
	public ResponseEntity<List<Incident>> getIncidentsByUser(@PathVariable Integer userId) {

		return ResponseEntity.ok(incidentService.getIncidentsByUser(userId));
	}

	@PutMapping("/updateIncident/{id}")
	public ResponseEntity<Incident> updateIncident(@PathVariable Integer id, @RequestBody IncidentDTO dto) {

		return ResponseEntity.ok(incidentService.updateIncident(id, dto));
	}

	@DeleteMapping("/deleteIncident/{id}")
	public ResponseEntity<String> deleteIncident(@PathVariable Integer id) {

		incidentService.deleteIncident(id);

		return ResponseEntity.ok("Incident deleted successfully");
	}

}
