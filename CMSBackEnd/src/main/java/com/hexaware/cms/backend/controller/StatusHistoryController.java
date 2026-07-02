package com.hexaware.cms.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cms.backend.dto.StatusUpdateDTO;
import com.hexaware.cms.backend.entity.IncidentStatusHistory;
import com.hexaware.cms.backend.service.IStatusHistory;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/statusHistory")
@SecurityRequirement(name = "Bearer Authentication")
public class StatusHistoryController {

	@Autowired
	IStatusHistory statusHistoryService;

	@PutMapping("/updateStatus")
	public ResponseEntity<IncidentStatusHistory> updateStatus(@RequestBody StatusUpdateDTO dto) {

		return ResponseEntity.ok(statusHistoryService.updateStatus(dto));
	}

	@GetMapping("/getHistory/{incidentId}")
	public ResponseEntity<List<IncidentStatusHistory>> getHistory(@PathVariable Integer incidentId) {

		return ResponseEntity.ok(statusHistoryService.getHistoryByIncident(incidentId));
	}

}
