package com.hexaware.cms.backend.service;

import java.util.List;

import com.hexaware.cms.backend.dto.AssignmentDTO;
import com.hexaware.cms.backend.dto.VerifyCaseDTO;
import com.hexaware.cms.backend.entity.IncidentAssignment;

public interface IAssignmentService {
	IncidentAssignment assignOfficer(AssignmentDTO dto);

	List<IncidentAssignment> getAssignmentsByOfficer(Integer officerId);
	
	public IncidentAssignment getAssignmentByIncident(Integer incidentId);
	List<VerifyCaseDTO> getClosedAssignments();

}
