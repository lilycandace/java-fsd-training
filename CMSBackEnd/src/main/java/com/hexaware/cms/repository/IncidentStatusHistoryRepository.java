package com.hexaware.cms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hexaware.cms.entity.IncidentStatusHistory;

@Repository
public interface IncidentStatusHistoryRepository    extends JpaRepository<IncidentStatusHistory, Integer> {

    List<IncidentStatusHistory>    findByIncidentIncidentId(Integer incidentId);
    Optional<IncidentStatusHistory> findFirstByIncidentIncidentIdAndNewStatusStatusNameOrderByChangedAtDesc(
            Integer incidentId,
            String statusName
    );
    @Query("""
    		select h
    		from IncidentStatusHistory h
    		where h.incident.incidentId = :incidentId
    		order by h.changedAt desc
    		""")
    		List<IncidentStatusHistory> getHistoryByIncident(Integer incidentId);

}