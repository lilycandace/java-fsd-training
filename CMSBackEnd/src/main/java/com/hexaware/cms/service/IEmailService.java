package com.hexaware.cms.service;

import java.io.ByteArrayInputStream;

public interface IEmailService {

	void sendEmail(String to, String subject, String body);

	void sendEmailWithAttachment(String to, String subject, String body, ByteArrayInputStream pdf, String fileName);
	
	  void sendIncidentClosedEmail(String to,String incidentTitle,Integer incidentId);

}