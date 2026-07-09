package com.hexaware.cms.service;

import java.io.ByteArrayInputStream;

public interface IReportService {

    ByteArrayInputStream generateIncidentReport(Integer incidentId);

}