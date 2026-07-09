package com.hexaware.cms.service;

import java.io.ByteArrayInputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements IEmailService {

	private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

	@Autowired
	private JavaMailSender mailSender;

	@Override
	public void sendEmail(String to, String subject, String body) {

		try {

			logger.info("Sending email to {}", to);

			SimpleMailMessage message = new SimpleMailMessage();

			message.setTo(to);
			message.setSubject(subject);
			message.setText(body);

			mailSender.send(message);

			logger.info("Email sent successfully to {}", to);

		} catch (Exception e) {

			logger.error("Failed to send email : {}", e.getMessage());

			throw new RuntimeException("Unable to send email");

		}

	}

	@Override
	public void sendEmailWithAttachment(String to, String subject, String body, ByteArrayInputStream pdf,
			String fileName) {

		try {

			MimeMessage message = mailSender.createMimeMessage();

			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			helper.setTo(to);
			helper.setSubject(subject);
			helper.setText(body);

			helper.addAttachment(fileName, new ByteArrayResource(pdf.readAllBytes()));

			mailSender.send(message);

			logger.info("Email with attachment sent successfully.");

		} catch (Exception e) {

			logger.error("Unable to send email.", e);

			throw new RuntimeException("Unable to send email.");

		}

	}

	public void sendIncidentClosedEmail(
            String to,
            String incidentTitle,
            Integer incidentId) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);

        message.setSubject("Incident Closed");

        message.setText(
                "Dear Citizen,\n\n"
                        + "Your incident has been successfully closed.\n\n"
                        + "Incident ID : "
                        + incidentId
                        + "\n"
                        + "Title : "
                        + incidentTitle
                        + "\n\n"
                        + "Thank you for using the Crime Management System.\n\n"
                        + "Regards,\n"
                        + "Crime Management Team");

        mailSender.send(message);

    }

}