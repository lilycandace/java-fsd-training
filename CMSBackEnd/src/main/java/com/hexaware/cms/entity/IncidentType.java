package com.hexaware.cms.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "incident_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IncidentType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "incident_type_id")
    private Integer incidentTypeId;

    @Column(name = "incident_type_name", nullable = false, unique = true)
    private String incidentTypeName;

    @OneToMany(mappedBy = "incidentType")
    @JsonIgnore
    private List<Incident> incidents;
}
