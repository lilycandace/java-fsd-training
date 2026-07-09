package com.hexaware.cms.service;

import java.util.List;

import com.hexaware.cms.dto.AssignmentDTO;
import com.hexaware.cms.dto.OfficerWorkloadDTO;
import com.hexaware.cms.dto.VerifyCaseDTO;
import com.hexaware.cms.entity.IncidentAssignment;

public interface IAssignmentService {
	IncidentAssignment assignOfficer(AssignmentDTO dto);

	List<IncidentAssignment> getAssignmentsByOfficer(Integer officerId);
	
	public IncidentAssignment getAssignmentByIncident(Integer incidentId);
	List<VerifyCaseDTO> getClosedAssignments();
	
	List<OfficerWorkloadDTO> getOfficerWorkloads();

}
