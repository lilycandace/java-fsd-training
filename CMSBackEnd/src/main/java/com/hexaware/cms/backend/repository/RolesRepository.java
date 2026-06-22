package com.hexaware.cms.backend.repository;

//import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.cms.backend.entity.Roles;

public interface RolesRepository extends JpaRepository<Roles, Integer>{
	
//	Optional<Roles> findByRoleName(String roleName);

}
