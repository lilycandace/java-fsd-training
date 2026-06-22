package com.hexaware.cms.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cms.backend.dto.IncidentDTO;
import com.hexaware.cms.backend.entity.Incident;
import com.hexaware.cms.backend.entity.IncidentStatus;
import com.hexaware.cms.backend.entity.IncidentType;
import com.hexaware.cms.backend.entity.User;
import com.hexaware.cms.backend.exception.IncidentNotFoundException;
import com.hexaware.cms.backend.exception.UserNotFoundException;
import com.hexaware.cms.backend.repository.IncidentRepository;
import com.hexaware.cms.backend.repository.IncidentStatusRepository;
import com.hexaware.cms.backend.repository.IncidentTypeRepository;
import com.hexaware.cms.backend.repository.UserRepository;

@Service
public class IncidentServiceImpl implements IIncidentService {

	@Autowired
	IncidentRepository incidentRepo;
	@Autowired
	UserRepository userRepo;
	@Autowired
	IncidentTypeRepository incidentTypeRepo;
	@Autowired
	IncidentStatusRepository incidentStatusRepo;

	@Override
	public Incident createIncident(IncidentDTO dto) {
		// TODO Auto-generated method stub
		User user = userRepo.findById(dto.getUserId()).orElseThrow(() -> new UserNotFoundException("User not found"));
		IncidentType type = incidentTypeRepo.findById(dto.getIncidentTypeId())
				.orElseThrow(() -> new RuntimeException("Incident Type not found"));
		IncidentStatus status = incidentStatusRepo.findByStatusName("INITIATED")
				.orElseThrow(() -> new RuntimeException("Status not found"));
		Incident incident = new Incident();
		incident.setUser(user);

		incident.setIncidentType(type);

		incident.setStatus(status);

		incident.setTitle(dto.getTitle());

		incident.setDescription(dto.getDescription());

		incident.setLocation(dto.getLocation());

		incident.setIncidentDate(LocalDateTime.now());
		return incidentRepo.save(incident);
	}

	@Override
	public Incident getIncidentById(Integer incidentId) {
		// TODO Auto-generated method stub
		return incidentRepo.findById(incidentId)
				.orElseThrow(() -> new IncidentNotFoundException("Incident not found with id " + incidentId));
	}

	@Override
	public List<Incident> getAllIncidents() {
		// TODO Auto-generated method stub
		return incidentRepo.findAll();
	}

	@Override
	public List<Incident> getIncidentsByUser(Integer userId) {
		// TODO Auto-generated method stub
		return incidentRepo.findByUserUserId(userId);
	}

	@Override
	public Incident updateIncident(Integer incidentId, IncidentDTO dto) {
		// TODO Auto-generated method
		Incident incident = incidentRepo.findById(incidentId)
				.orElseThrow(() -> new IncidentNotFoundException("Incident not found with id " + incidentId));
		incident.setTitle(dto.getTitle());
		incident.setDescription(dto.getDescription());
		incident.setLocation(dto.getLocation());
		return incidentRepo.save(incident);

	}

	@Override
	public void deleteIncident(Integer incidentId) {
		// TODO Auto-generated method stub
		Incident incident=incidentRepo.findById(incidentId).orElseThrow(()->new IncidentNotFoundException("Incident not found with id:"+incidentId));
		incidentRepo.delete(incident);
	}

}
