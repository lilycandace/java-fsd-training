package com.hexaware.cms.backend.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cms.backend.entity.IncidentStatus;
import com.hexaware.cms.backend.entity.IncidentType;
import com.hexaware.cms.backend.entity.Roles;
import com.hexaware.cms.backend.repository.IncidentStatusRepository;
import com.hexaware.cms.backend.repository.IncidentTypeRepository;
import com.hexaware.cms.backend.repository.RolesRepository;

@Service
public class LookupServiceImpl implements ILookupService{
	private static final Logger logger =
	        LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	RolesRepository roleRepo;
	@Autowired
	IncidentTypeRepository typeRepo;
	@Autowired
	IncidentStatusRepository statusRepo;
	@Override
	public List<Roles> getAllRoles() {
		// TODO Auto-generated method 
		
		return roleRepo.findAll();
	}

	@Override
	public List<IncidentType> getAllIncidentTypes() {
		// TODO Auto-generated method stub
		return typeRepo.findAll();
	}

	@Override
	public List<IncidentStatus> getAllIncidentStatuses() {
		// TODO Auto-generated method stub
		return statusRepo.findAll();
	}

}
