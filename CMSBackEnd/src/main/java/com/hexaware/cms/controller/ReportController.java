package com.hexaware.cms.controller;

import java.io.ByteArrayInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.hexaware.cms.service.IReportService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/reports")
@SecurityRequirement(name = "Bearer Authentication")
public class ReportController {

    @Autowired
    private IReportService reportService;
    
    @PreAuthorize("hasAnyRole('Citizen','Officer','StationHead')")
    @GetMapping("/incident/{incidentId}")
    public ResponseEntity<InputStreamResource> downloadIncidentReport(
            @PathVariable Integer incidentId) {

        ByteArrayInputStream pdf =
                reportService.generateIncidentReport(incidentId);

        HttpHeaders headers = new HttpHeaders();

        headers.add(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=Incident_" + incidentId + ".pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(pdf));
    }

}