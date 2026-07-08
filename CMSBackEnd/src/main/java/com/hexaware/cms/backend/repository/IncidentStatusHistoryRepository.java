package com.hexaware.cms.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.cms.backend.entity.IncidentStatusHistory;

@Repository
public interface IncidentStatusHistoryRepository    extends JpaRepository<IncidentStatusHistory, Integer> {

    List<IncidentStatusHistory>    findByIncidentIncidentId(Integer incidentId);
    Optional<IncidentStatusHistory> findFirstByIncidentIncidentIdAndNewStatusStatusNameOrderByChangedAtDesc(
            Integer incidentId,
            String statusName
    );

}