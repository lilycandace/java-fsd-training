package com.hexaware.cms.service;

import java.io.ByteArrayInputStream;
import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.hexaware.cms.dto.IncidentDTO;
import com.hexaware.cms.entity.Incident;
import com.hexaware.cms.entity.IncidentStatus;
import com.hexaware.cms.entity.IncidentType;
import com.hexaware.cms.entity.User;
import com.hexaware.cms.exception.IncidentNotFoundException;
import com.hexaware.cms.exception.UserNotFoundException;
import com.hexaware.cms.repository.IncidentRepository;
import com.hexaware.cms.repository.IncidentStatusRepository;
import com.hexaware.cms.repository.IncidentTypeRepository;
import com.hexaware.cms.repository.UserRepository;

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

	@Autowired
	private IReportService reportService;

	@Override
	public Incident createIncident(IncidentDTO dto,Authentication auth) {
		// TODO Auto-generated method stub
		logger.info("Creating incident: {}", dto.getTitle());
		String email = auth.getName();

		User user = userRepo.findByEmail(email)
		        .orElseThrow(() -> new UserNotFoundException("User not found"));		IncidentType type = incidentTypeRepo.findById(dto.getIncidentTypeId())
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
		Incident savedIncident = incidentRepo.save(incident);
		ByteArrayInputStream pdf = reportService.generateIncidentReport(savedIncident.getIncidentId());

		logger.info("Incident created successfully.");
		String subject = "Crime Management System - Incident Registered";

		String body = "Dear " + savedIncident.getUser().getFirstName() + ",\n\n"
				+ "Your incident has been registered successfully.\n\n" + "Incident ID : "
				+ savedIncident.getIncidentId() + "\n" + "Title : " + savedIncident.getTitle() + "\n" + "Status : "
				+ savedIncident.getStatus().getStatusName() + "\n\n"
				+ "Our team will review your complaint and notify you of any updates.\n\n" + "Regards,\n"
				+ "Crime Management System";

		emailService.sendEmailWithAttachment(

				savedIncident.getUser().getEmail(),

				subject,

				body,

				pdf,

				"Incident_" + savedIncident.getIncidentId() + ".pdf");

		return savedIncident;
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
	public List<Incident> getIncidentsByEmail(String email) {

	    User user = userRepo.findByEmail(email)
	            .orElseThrow(() -> new UserNotFoundException("User not found"));

	    return incidentRepo.findByUser(user);
	}
	@Override
	public List<Incident> getClosedIncidents() {

	    return incidentRepo.findByStatusStatusName("closed");

	}

	
}
