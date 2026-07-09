package com.hexaware.cms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.cms.entity.IncidentEvidence;

@Repository
public interface IncidentEvidenceRepository   extends JpaRepository<IncidentEvidence, Integer> {

    List<IncidentEvidence>  findByIncidentIncidentId(Integer incidentId);

}