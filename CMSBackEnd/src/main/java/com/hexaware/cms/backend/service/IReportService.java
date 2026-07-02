package com.hexaware.cms.backend.service;

import java.io.ByteArrayInputStream;

public interface IReportService {

    ByteArrayInputStream generateIncidentReport(Integer incidentId);

}