package com.hexaware.cms.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.cms.backend.entity.IncidentAssignment;

@Repository
public interface IncidentAssignmentRepository extends JpaRepository<IncidentAssignment, Integer> {

    List<IncidentAssignment> findByOfficerUserId(Integer officerId);
    Optional<IncidentAssignment> findByIncidentIncidentId(Integer incidentId);
    
    List<IncidentAssignment> findByIncidentStatusStatusName(String statusName);
    
}