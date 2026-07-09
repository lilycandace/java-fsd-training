package com.hexaware.cms.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "incidents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Incident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "incident_id")
    private Integer incidentId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "incident_type_id", nullable = false)
    private IncidentType incidentType;

    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    private IncidentStatus status;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private LocalDateTime incidentDate;

    @CreationTimestamp
    private LocalDateTime createdAt;
    @OneToMany(mappedBy = "incident")
    @JsonIgnore
    private List<IncidentAssignment> assignments;

    @OneToMany(mappedBy = "incident")
    @JsonIgnore
    private List<IncidentStatusHistory> statusHistory;

    @OneToMany(mappedBy = "incident")
    @JsonIgnore
    private List<IncidentEvidence> evidenceList;
}
