package com.hexaware.cms.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	IncidentRepository incidentRepo;
	@Autowired
	UserRepository userRepo;
	@Autowired
	IncidentTypeRepository incidentTypeRepo;
	@Autowired
	IncidentStatusRepository incidentStatusRepo;
	
	@Autowired
	IEmailService emailService;

	@Override
	public Incident createIncident(IncidentDTO dto) {
		// TODO Auto-generated method stub
		logger.info("Creating incident: {}", dto.getTitle());
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
		Incident saveIncident = incidentRepo.save(incident);
		logger.info("Incident created successfully.");
		emailService.sendEmail(saveIncident.getUser().getEmail(), "Incident Registered",
				"Your incident has been registered successfully.\n\n" + "Incident ID : "
						+ saveIncident.getIncidentId());
		return saveIncident;
	}

	@Override
	public Incident getIncidentById(Integer incidentId) {
		// TODO Auto-generated method stub
		logger.info("Fetching incident ID: {}", incidentId);
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
		Incident incident = incidentRepo.findById(incidentId).orElseThrow(() -> {
			logger.error("Incident not found with ID: {}", incidentId);
			return new IncidentNotFoundException("Incident not found");
		});
		incident.setTitle(dto.getTitle());
		incident.setDescription(dto.getDescription());
		incident.setLocation(dto.getLocation());
		return incidentRepo.save(incident);

	}

	@Override
	public void deleteIncident(Integer incidentId) {
		// TODO Auto-generated method stub
		logger.info("Deleting incident ID: {}", incidentId);
		Incident incident = incidentRepo.findById(incidentId)
				.orElseThrow(() -> new IncidentNotFoundException("Incident not found with id:" + incidentId));
		incidentRepo.delete(incident);
	}

}
