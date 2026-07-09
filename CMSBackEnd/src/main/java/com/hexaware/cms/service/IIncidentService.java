package com.hexaware.cms.service;

import java.util.List;

import org.springframework.security.core.Authentication;

import com.hexaware.cms.dto.IncidentDTO;
import com.hexaware.cms.entity.Incident;

public interface IIncidentService {
//	Incident createIncident(IncidentDTO dto);

	Incident getIncidentById(Integer incidentId);

	List<Incident> getAllIncidents();

	List<Incident> getIncidentsByUser(Integer userId);

	Incident updateIncident(Integer incidentId, IncidentDTO dto);

	void deleteIncident(Integer incidentId);
	
	public List<Incident> getIncidentsByEmail(String email) ;
	
	public Incident createIncident(IncidentDTO dto,Authentication auth);
	
	List<Incident> getClosedIncidents();

}
