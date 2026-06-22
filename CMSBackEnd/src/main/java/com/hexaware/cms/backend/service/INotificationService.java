package com.hexaware.cms.backend.service;

import java.util.List;

import com.hexaware.cms.backend.dto.NotificationDTO;
import com.hexaware.cms.backend.entity.Notification;

public interface INotificationService {

	Notification createNotification(NotificationDTO dto);

	List<Notification> getNotificationsByUser(Integer userId);

}
