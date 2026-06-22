package com.hexaware.cms.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cms.backend.dto.AssignmentDTO;
import com.hexaware.cms.backend.entity.Incident;
import com.hexaware.cms.backend.entity.IncidentAssignment;
import com.hexaware.cms.backend.entity.User;
import com.hexaware.cms.backend.exception.IncidentNotFoundException;
import com.hexaware.cms.backend.exception.UserNotFoundException;
import com.hexaware.cms.backend.repository.IncidentAssignmentRepository;
import com.hexaware.cms.backend.repository.IncidentRepository;
import com.hexaware.cms.backend.repository.UserRepository;

@Service
public class AssignmentServiceImpl implements IAssignmentService {

	@Autowired
	IncidentAssignmentRepository assignmentRepo;

	@Autowired
	IncidentRepository incidentRepo;

	@Autowired
	UserRepository userRepo;

	@Override
	public IncidentAssignment assignOfficer(AssignmentDTO dto) {
		// TODO Auto-generated method stub
		Incident incident =incidentRepo.findById( dto.getIncidentId()).orElseThrow(()->new IncidentNotFoundException("Incident not found with id:)"+dto.getIncidentId()));

	    User officer =userRepo.findById( dto.getOfficerId()).orElseThrow(()->new UserNotFoundException("officer not found:"+dto.getOfficerId()));

	    User assignedBy =userRepo.findById(dto.getAssignedById()) .orElseThrow(()->new UserNotFoundException("StationHead id not found:"+dto.getOfficerId()));

	    IncidentAssignment assignment = new IncidentAssignment();

	    assignment.setIncident(incident);
	    assignment.setOfficer(officer);
	    assignment.setAssignedBy(assignedBy);

	    return assignmentRepo.save(assignment);
	}

	@Override
	public List<IncidentAssignment> getAssignmentsByOfficer(Integer officerId) {
		// TODO Auto-generated method stub
		
		
		return assignmentRepo.findByOfficerUserId(officerId);
	}

}
