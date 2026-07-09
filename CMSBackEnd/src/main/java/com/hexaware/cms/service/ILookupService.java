package com.hexaware.cms.service;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hexaware.cms.entity.IncidentStatus;
import com.hexaware.cms.entity.IncidentType;
import com.hexaware.cms.entity.Roles;

@Repository
public interface ILookupService {

    List<Roles> getAllRoles();

    List<IncidentType> getAllIncidentTypes();

    List<IncidentStatus> getAllIncidentStatuses();

}
