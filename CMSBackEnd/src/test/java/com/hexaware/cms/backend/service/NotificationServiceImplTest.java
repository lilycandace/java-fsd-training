package com.hexaware.cms.backend.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.cms.service.INotificationService;

@SpringBootTest
class NotificationServiceImplTest {

    @Autowired
    private INotificationService notificationService;

    @Test
    void testGetNotificationsByUser() {

        assertNotNull(
                notificationService
                        .getNotificationsByUser(1));
    }
}