package com.hexaware.cms.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cms.dto.AssignmentDTO;
import com.hexaware.cms.dto.OfficerWorkloadDTO;
import com.hexaware.cms.dto.VerifyCaseDTO;
import com.hexaware.cms.entity.Incident;
import com.hexaware.cms.entity.IncidentAssignment;
import com.hexaware.cms.entity.IncidentStatus;
import com.hexaware.cms.entity.IncidentStatusHistory;
import com.hexaware.cms.entity.User;
import com.hexaware.cms.exception.IncidentNotFoundException;
import com.hexaware.cms.exception.UserNotFoundException;
import com.hexaware.cms.repository.IncidentAssignmentRepository;
import com.hexaware.cms.repository.IncidentRepository;
import com.hexaware.cms.repository.IncidentStatusHistoryRepository;
import com.hexaware.cms.repository.IncidentStatusRepository;
import com.hexaware.cms.repository.UserRepository;

@Service
public class AssignmentServiceImpl implements IAssignmentService {
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	IncidentAssignmentRepository assignmentRepo;

	@Autowired
	IncidentRepository incidentRepo;

	@Autowired
	UserRepository userRepo;

	@Autowired
	IEmailService emailService;

	@Autowired
	IncidentStatusRepository statusRepo;
	
	@Autowired
	IncidentStatusHistoryRepository statusHistoryRepo;

	@Override
	public IncidentAssignment assignOfficer(AssignmentDTO dto) {

		// TODO Auto-generated method stub
		logger.info("Assigning officer to incident.");
		Incident incident = incidentRepo.findById(dto.getIncidentId())
				.orElseThrow(() -> new IncidentNotFoundException("Incident not found with id:)" + dto.getIncidentId()));

		User officer = userRepo.findById(dto.getOfficerId())
				.orElseThrow(() -> new UserNotFoundException("officer not found:" + dto.getOfficerId()));

		User assignedBy = userRepo.findById(dto.getAssignedById())
				.orElseThrow(() -> new UserNotFoundException("StationHead id not found:" + dto.getOfficerId()));

		IncidentAssignment assignment = new IncidentAssignment();

		assignment.setIncident(incident);
		assignment.setOfficer(officer);
		assignment.setAssignedBy(assignedBy);
		IncidentStatus activeStatus = statusRepo.findByStatusName("active")
				.orElseThrow(() -> new RuntimeException("Status not found"));

		incident.setStatus(activeStatus);

		incidentRepo.save(incident);
		IncidentAssignment saveAssign = assignmentRepo.save(assignment);
		IncidentStatus active = statusRepo .findByStatusName("active").orElseThrow(() ->new RuntimeException("Status not found"));

		incident.setStatus(active);

		incidentRepo.save(incident);
		logger.info("Officer assigned successfully.");
		String subject = "Crime Management System - Incident Assigned";

		String body = "Dear " + assignment.getOfficer().getFirstName() + ",\n\n"
				+ "A new incident has been assigned to you.\n\n" + "Incident ID : "
				+ assignment.getIncident().getIncidentId() + "\n" + "Please log in to review the incident details.\n\n"
				+ "Regards,\n" + "Crime Management System";

		emailService.sendEmail(assignment.getOfficer().getEmail(), subject, body);

		return saveAssign;
	}

	@Override
	public List<IncidentAssignment> getAssignmentsByOfficer(Integer officerId) {
		// TODO Auto-generated method stub

		return assignmentRepo.findByOfficerUserId(officerId);
	}
	@Override
	public IncidentAssignment getAssignmentByIncident(Integer incidentId) {

	    return assignmentRepo.findByIncidentIncidentId(incidentId)
	            .orElse(null);

	}
	@Override
	public List<VerifyCaseDTO> getClosedAssignments() {
		List<IncidentAssignment> assignments =
	            assignmentRepo.findByIncidentStatusStatusName("closed");


		List<VerifyCaseDTO> list = new ArrayList<>();

		for (IncidentAssignment assignment : assignments) {

		    VerifyCaseDTO dto = new VerifyCaseDTO();

		    dto.setAssignmentId(assignment.getAssignmentId());

		    dto.setIncidentId(
		            assignment.getIncident().getIncidentId());

		    dto.setTitle(
		            assignment.getIncident().getTitle());

		    dto.setCitizenName(

		            assignment.getIncident().getUser().getFirstName()

		            + " "

		            + assignment.getIncident().getUser().getLastName());

		    dto.setOfficerName(

		            assignment.getOfficer().getFirstName()

		            + " "

		            + assignment.getOfficer().getLastName());

		    dto.setAssignedAt(

		            assignment.getAssignedAt());

		    IncidentStatusHistory history =
		            statusHistoryRepo
		            .findFirstByIncidentIncidentIdAndNewStatusStatusNameOrderByChangedAtDesc(

		                    assignment.getIncident().getIncidentId(),

		                    "closed")

		            .orElse(null);

		    if(history != null){

		        dto.setClosedAt(history.getChangedAt());

		    }

		    list.add(dto);

		}

		return list;
	}
	@Override
	public List<OfficerWorkloadDTO> getOfficerWorkloads() {

	    return assignmentRepo.getOfficerWorkloads();

	}

}
