package com.hexaware.cms.service;

import java.util.List;

import com.hexaware.cms.dto.NotificationDTO;
import com.hexaware.cms.entity.Notification;

public interface INotificationService {

	Notification createNotification(NotificationDTO dto);

	List<Notification> getNotificationsByUser(Integer userId);

}
