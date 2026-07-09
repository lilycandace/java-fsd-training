package com.hexaware.cms.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerifyCaseDTO {

    private Integer assignmentId;

    private Integer incidentId;

    private String title;

    private String citizenName;

    private String officerName;

    private LocalDateTime assignedAt;

    private LocalDateTime closedAt;
    private String remarks;

}