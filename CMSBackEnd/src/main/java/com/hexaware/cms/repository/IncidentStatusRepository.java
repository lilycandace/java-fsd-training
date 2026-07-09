	package com.hexaware.cms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.cms.entity.IncidentStatus;

public interface IncidentStatusRepository extends JpaRepository<IncidentStatus, Integer> {
	
	Optional<IncidentStatus> findByStatusName(String statusName);

}
