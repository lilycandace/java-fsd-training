package com.hexaware.cms.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cms.backend.entity.IncidentStatus;
import com.hexaware.cms.backend.entity.IncidentType;
import com.hexaware.cms.backend.entity.Roles;
import com.hexaware.cms.backend.service.ILookupService;

@RestController
@RequestMapping("/api/lookups")
public class LookupController {
	
	ILookupService lookupService;
	
	
	@GetMapping("/getAllRoles")
	public List<Roles> getAllRoles() {
		return lookupService.getAllRoles();
		
	}
	@GetMapping("/getAllIncidentTypes")
	public List<IncidentType> getAllTypes(){
		return lookupService.getAllIncidentTypes();
	}
	
	@GetMapping("/getAllIncidentStatus")
	public List<IncidentStatus> getAllStatus(){
		return lookupService.getAllIncidentStatuses();
	}

}
