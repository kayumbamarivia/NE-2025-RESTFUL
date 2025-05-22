/**
 * @fileoverview Email service routes for the CPMS application.
 * This file defines endpoints for handling email notifications and communications
 * within the parking management system.
 * 
 * @requires express - Web framework
 * @requires ../controllers/EmailController - Email service business logic
 */

import { Router } from "express";
import { EmailController } from "../controllers/EmailController.ts";

const router = Router();
const emailController = new EmailController();

/**
 * Email Service Routes
 * 
 * @route POST /send-mail
 * @description Send an email notification
 * @param {Object} req.body - Email details including recipient, subject, and content
 * @returns {Object} Response indicating email status
 */
router.post("/send-mail", emailController.sendEmail.bind(emailController));

export { router as emailRoutes };