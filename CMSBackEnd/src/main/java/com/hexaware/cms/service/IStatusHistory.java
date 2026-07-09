package com.hexaware.cms.service;

import java.util.List;

import com.hexaware.cms.dto.StatusUpdateDTO;
import com.hexaware.cms.entity.IncidentStatusHistory;

public interface IStatusHistory {

	IncidentStatusHistory updateStatus(StatusUpdateDTO dto);

	List<IncidentStatusHistory> getHistoryByIncident(Integer incidentId);
	
	
	

}
