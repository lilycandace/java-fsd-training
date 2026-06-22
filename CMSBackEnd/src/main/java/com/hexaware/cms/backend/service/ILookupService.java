package com.hexaware.cms.backend.service;

import java.util.List;

import com.hexaware.cms.backend.entity.IncidentStatus;
import com.hexaware.cms.backend.entity.IncidentType;
import com.hexaware.cms.backend.entity.Roles;

public interface ILookupService {

    List<Roles> getAllRoles();

    List<IncidentType> getAllIncidentTypes();

    List<IncidentStatus> getAllIncidentStatuses();

}
