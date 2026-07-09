package com.hexaware.cms.service;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cms.dto.StatusUpdateDTO;
import com.hexaware.cms.entity.Incident;
import com.hexaware.cms.entity.IncidentStatus;
import com.hexaware.cms.entity.IncidentStatusHistory;
import com.hexaware.cms.entity.User;
import com.hexaware.cms.exception.IncidentNotFoundException;
import com.hexaware.cms.exception.IncidentStatusNotFoundException;
import com.hexaware.cms.exception.UserNotFoundException;
import com.hexaware.cms.repository.IncidentRepository;
import com.hexaware.cms.repository.IncidentStatusHistoryRepository;
import com.hexaware.cms.repository.IncidentStatusRepository;
import com.hexaware.cms.repository.UserRepository;

@Service
public class StatusHistoryImpl implements IStatusHistory {
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	IncidentRepository incidentrepo;
	@Autowired
	IncidentStatusRepository statusrepo;
	@Autowired
	IncidentStatusHistoryRepository statusHistoryRepo;
	@Autowired
	UserRepository userRepo;
	@Autowired
	IEmailService emailService;

	@Override
	public IncidentStatusHistory updateStatus(StatusUpdateDTO dto) {
		// TODO Auto-generated method stub
		logger.info("Updating status of incident {}", dto.getIncidentId());
		Incident incident = incidentrepo.findById(dto.getIncidentId())
				.orElseThrow(() -> new IncidentNotFoundException("Incident does not exist:" + dto.getIncidentId()));
		IncidentStatus oldStatus = incident.getStatus();
		IncidentStatus newStatus = statusrepo.findById(dto.getStatusId())
				.orElseThrow(() -> new IncidentStatusNotFoundException("Status not found"));
		incident.setStatus(newStatus);
		User changedBy = userRepo.findById(dto.getChangedById())
				.orElseThrow(() -> new UserNotFoundException("User not found"));
		incidentrepo.save(incident);
		IncidentStatusHistory history = new IncidentStatusHistory();
		history.setIncident(incident);

		history.setOldStatus(oldStatus);

		history.setNewStatus(newStatus);

		history.setChangedBy(changedBy);

		history.setRemarks(dto.getRemarks());

		history.setChangedAt(LocalDateTime.now());
		IncidentStatusHistory saveHist = statusHistoryRepo.save(history);
		logger.info("Status updated successfully.");
		String subject;
		String body;

		if ("closed".equalsIgnoreCase(newStatus.getStatusName())) {

			subject = "Crime Management System - Incident Closed";

			body = "Dear " + incident.getUser().getFirstName() + ",\n\n"
					+ "Your incident has been successfully closed.\n\n" + "Incident ID : " + incident.getIncidentId()
					+ "\n" + "Incident Title : " + incident.getTitle() + "\n\n" + "Regards,\nCrime Management System";

		} else {

			subject = "Crime Management System - Status Updated";

			body = "Dear " + incident.getUser().getFirstName() + ",\n\n"
					+ "The status of your incident has changed.\n\n" + "Incident ID : " + incident.getIncidentId()
					+ "\n" + "Current Status : " + newStatus.getStatusName() + "\n\n"
					+ "Regards,\nCrime Management System";

		}

		emailService.sendEmail(incident.getUser().getEmail(), subject, body);
		return saveHist;
	}

	@Override
	public List<IncidentStatusHistory> getHistoryByIncident(Integer incidentId) {
		// TODO Auto-generated method stub
		return statusHistoryRepo.findByIncidentIncidentId(incidentId);
	}

}
