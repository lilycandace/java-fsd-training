package com.hexaware.cms.backend.service;

import java.util.List;

import com.hexaware.cms.backend.dto.StatusUpdateDTO;
import com.hexaware.cms.backend.entity.IncidentStatusHistory;

public interface IStatusHistory {

	IncidentStatusHistory updateStatus(StatusUpdateDTO dto);

	List<IncidentStatusHistory> getHistoryByIncident(Integer incidentId);
	
	

}
