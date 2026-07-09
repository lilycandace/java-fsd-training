package com.hexaware.cms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cms.entity.IncidentStatus;
import com.hexaware.cms.entity.IncidentType;
import com.hexaware.cms.entity.Roles;
import com.hexaware.cms.service.ILookupService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/lookups")
@SecurityRequirement(name = "Bearer Authentication")
public class LookupController {
	
	@Autowired
	ILookupService lookupService;
	
	@PreAuthorize("hasAnyRole('Citizen','Officer','StationHead')")
	@GetMapping("/getAllRoles")
	public List<Roles> getAllRoles() {
		return lookupService.getAllRoles();
		
	}
	@PreAuthorize("hasAnyRole('Citizen','Officer','StationHead')")
	@GetMapping("/getAllIncidentTypes")
	public List<IncidentType> getAllTypes(){
		return lookupService.getAllIncidentTypes();
	}
	@PreAuthorize("hasAnyRole('Citizen','Officer','StationHead')")
	@GetMapping("/getAllIncidentStatus")
	public List<IncidentStatus> getAllStatus(){
		return lookupService.getAllIncidentStatuses();
	}

}
