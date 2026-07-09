package com.hexaware.cms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hexaware.cms.dto.OfficerWorkloadDTO;
import com.hexaware.cms.entity.IncidentAssignment;

@Repository
public interface IncidentAssignmentRepository extends JpaRepository<IncidentAssignment, Integer> {

	List<IncidentAssignment> findByOfficerUserId(Integer officerId);

	Optional<IncidentAssignment> findByIncidentIncidentId(Integer incidentId);

	List<IncidentAssignment> findByIncidentStatusStatusName(String statusName);

	@Query("select new com.hexaware.cms.dto.OfficerWorkloadDTO( u.userId, concat(u.firstName,' ',u.lastName), count(a) ) from User u left join IncidentAssignment a on a.officer.userId=u.userId and a.incident.status.statusName='active' where u.role.roleName='Officer' group by u.userId, u.firstName, u.lastName order by count(a)")
	List<OfficerWorkloadDTO> getOfficerWorkloads();

}