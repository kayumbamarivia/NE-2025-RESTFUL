/**
 * @fileoverview Notification management routes for the CPMS application.
 * This file defines endpoints for handling system notifications, including
 * creation, retrieval, updates, and deletion of notifications.
 * 
 * @requires express - Web framework
 * @requires ../controllers/NotificationController - Notification business logic
 * 
 * @note This module is currently commented out and not in use
 */

// import { Router } from 'express';
// import { NotificationController } from '../../controllers/NotificationController.ts';

// const router = Router();
// const notificationController = new NotificationController();

/**
 * Notification Management Routes
 * 
 * @route GET /notifications
 * @description Get all system notifications
 * 
 * @route GET /notifications/:id
 * @description Get a specific notification by ID
 * @param {string} id - Notification identifier
 * 
 * @route POST /notifications
 * @description Create a new notification
 * @param {Object} req.body - Notification details
 * 
 * @route PUT /notifications/:id
 * @description Update an existing notification
 * @param {string} id - Notification identifier
 * @param {Object} req.body - Updated notification details
 * 
 * @route DELETE /notifications/:id
 * @description Delete a notification
 * @param {string} id - Notification identifier
 */
// router.get('/notifications', notificationController.getAllNotifications.bind(notificationController));
// router.get('/notifications/:id', notificationController.getNotificationById.bind(notificationController));
// router.post('/notifications', notificationController.createNotification.bind(notificationController));
// router.put('/notifications/:id', notificationController.updateNotification.bind(notificationController));
// router.delete('/notifications/:id', notificationController.deleteNotification.bind(notificationController));

// export const notificationRoutes = router;
