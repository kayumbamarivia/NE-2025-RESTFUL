/**
 * @fileoverview Email notification controller for the CPMS application.
 * This controller handles email notification functionality for the parking management system.
 * 
 * @requires express - Web framework types
 * @requires ../services/EmailService - Email service business logic
 */

import { Request, Response } from 'express';
import { EmailService } from '../services/EmailService.ts';

/**
 * EmailController class handles email notification requests
 * @class
 */
export class EmailController {
  private readonly emailService: EmailService;

  /**
   * Creates an instance of EmailController
   * @constructor
   */
  constructor() {
    this.emailService = new EmailService();
  }

  /**
   * Send email notification
   * @async
   * @param {Request} req - Express request object containing email address in body
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If email address is invalid or sending fails
   * 
   * @example
   * // Request body
   * {
   *   "email": "user@example.com"
   * }
   */
  async sendEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: 'Valid email address is required' });
      return;
    }

    try {
      await this.emailService.sendNotification(email);
      res.status(201).json({ message: `Notification sent to ${email}` });
    } catch (error: any) {
      console.error(`Error in sendTransferNotification: ${error.message}`);
      res.status(500).json({ error: 'Failed to send notification' });
    }
  }
}