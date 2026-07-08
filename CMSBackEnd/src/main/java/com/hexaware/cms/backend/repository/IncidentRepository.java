package com.hexaware.cms.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.cms.backend.entity.Incident;
import com.hexaware.cms.backend.entity.User;

@Repository
public interface IncidentRepository    extends JpaRepository<Incident, Integer> {

    List<Incident> findByUserUserId(Integer userId);

	List<Incident> findByUser(User user);
	
	List<Incident> findByStatusStatusName(String statusName);

}