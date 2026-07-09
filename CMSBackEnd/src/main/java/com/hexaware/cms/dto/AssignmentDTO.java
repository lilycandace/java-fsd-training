package com.hexaware.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentDTO {

    private Integer incidentId;

    private Integer officerId;

    private Integer assignedById;
}