package com.hexaware.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusUpdateDTO {

    private Integer incidentId;

    private Integer statusId;

    private Integer changedById;

    private String remarks;
}