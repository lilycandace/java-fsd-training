package com.hexaware.cms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.cms.entity.Incident;
import com.hexaware.cms.entity.User;

@Repository
public interface IncidentRepository    extends JpaRepository<Incident, Integer> {

    List<Incident> findByUserUserId(Integer userId);

	List<Incident> findByUser(User user);
	
	List<Incident> findByStatusStatusName(String statusName);

}