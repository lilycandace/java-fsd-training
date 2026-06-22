package com.hexaware.cms.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cms.backend.dto.NotificationDTO;
import com.hexaware.cms.backend.entity.Notification;
import com.hexaware.cms.backend.service.INotificationService;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
	@Autowired
	INotificationService notifService;

	@PostMapping
	public ResponseEntity<Notification> createNotification(@RequestBody NotificationDTO dto) {

		return ResponseEntity.ok(notifService.createNotification(dto));
	}

	@GetMapping("/{userId}")
	public ResponseEntity<List<Notification>> getNotifications(@PathVariable Integer userId) {

		return ResponseEntity.ok(notifService.getNotificationsByUser(userId));
	}

}
