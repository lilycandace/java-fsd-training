package com.hexaware.cms.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cms.backend.dto.StatusUpdateDTO;
import com.hexaware.cms.backend.entity.Incident;
import com.hexaware.cms.backend.entity.IncidentStatus;
import com.hexaware.cms.backend.entity.IncidentStatusHistory;
import com.hexaware.cms.backend.entity.User;
import com.hexaware.cms.backend.exception.IncidentNotFoundException;
import com.hexaware.cms.backend.exception.IncidentStatusNotFoundException;
import com.hexaware.cms.backend.exception.UserNotFoundException;
import com.hexaware.cms.backend.repository.IncidentRepository;
import com.hexaware.cms.backend.repository.IncidentStatusHistoryRepository;
import com.hexaware.cms.backend.repository.IncidentStatusRepository;
import com.hexaware.cms.backend.repository.UserRepository;

@Service
public class StatusHistoryImpl implements IStatusHistory{
	private static final Logger logger =
	        LoggerFactory.getLogger(UserServiceImpl.class);
	
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
		Incident incident=incidentrepo.findById(dto.getIncidentId()).orElseThrow(()->new IncidentNotFoundException("Incident does not exist:"+dto.getIncidentId()));
		IncidentStatus oldStatus =incident.getStatus();		
		IncidentStatus newStatus =statusrepo.findById(dto.getStatusId()).orElseThrow(() ->new IncidentStatusNotFoundException("Status not found"));
		incident.setStatus(newStatus);
		User changedBy = userRepo.findById( dto.getChangedById()) .orElseThrow(() ->new UserNotFoundException( "User not found"));
		incidentrepo.save(incident);
		IncidentStatusHistory history =new IncidentStatusHistory();
		history.setIncident(incident);

		history.setOldStatus(oldStatus);

		history.setNewStatus(newStatus);

		history.setChangedBy(changedBy);

		history.setRemarks(dto.getRemarks());

		history.setChangedAt(LocalDateTime.now());
		IncidentStatusHistory saveHist=statusHistoryRepo.save(history);
		logger.info("Status updated successfully.");
		emailService.sendEmail(
		        incident.getUser().getEmail(),
		        "Incident Status Updated",
		        "Your incident status has been updated to: "
		        + incident.getStatus().getStatusName());
		return saveHist;
	}

	@Override
	public List<IncidentStatusHistory> getHistoryByIncident(Integer incidentId) {
		// TODO Auto-generated method stub
		return statusHistoryRepo.findByIncidentIncidentId(incidentId);
	}

}
