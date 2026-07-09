package com.hexaware.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfficerWorkloadDTO {

    private Integer officerId;

    private String officerName;

    private Long activeCases;
}