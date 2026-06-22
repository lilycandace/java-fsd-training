package com.hexaware.cms.backend.service;

import java.util.List;

import com.hexaware.cms.backend.dto.IncidentDTO;
import com.hexaware.cms.backend.entity.Incident;

public interface IIncidentService {
	Incident createIncident(IncidentDTO dto);

	Incident getIncidentById(Integer incidentId);

	List<Incident> getAllIncidents();

	List<Incident> getIncidentsByUser(Integer userId);

	Incident updateIncident(Integer incidentId, IncidentDTO dto);

	void deleteIncident(Integer incidentId);

}
