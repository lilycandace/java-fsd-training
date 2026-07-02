package com.hexaware.cms.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cms.backend.dto.NotificationDTO;
import com.hexaware.cms.backend.entity.Notification;
import com.hexaware.cms.backend.entity.User;
import com.hexaware.cms.backend.exception.UserNotFoundException;
import com.hexaware.cms.backend.repository.NotificationRepository;
import com.hexaware.cms.backend.repository.UserRepository;

@Service
public class NotificationServiceImpl implements INotificationService{
	private static final Logger logger =
	        LoggerFactory.getLogger(UserServiceImpl.class);

	
	@Autowired
	NotificationRepository notifRepo;
	@Autowired
	UserRepository userRepo;
	@Override
	public Notification createNotification(NotificationDTO dto) {
		// TODO Auto-generated method stub
		logger.info("Creating notification for user {}", dto.getUserId());
		User user=userRepo.findById(dto.getUserId()).orElseThrow(()->new UserNotFoundException("User not found:"+dto.getUserId()));
		Notification notif=new Notification();	
		notif.setUser(user);
		notif.setSubject(dto.getSubject());
		notif.setMessage(dto.getMessage());
		notif.setSentAt(LocalDateTime.now());
		return notifRepo.save(notif);
	}

	@Override
	public List<Notification> getNotificationsByUser(Integer userId) {
		// TODO Auto-generated method stub
		
		return notifRepo.findByUserUserId(userId);
	}

}
