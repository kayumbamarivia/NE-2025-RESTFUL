/**
 * @fileoverview Parking lot management controller for the CPMS application.
 * This controller handles all parking lot-related operations including CRUD operations
 * for managing parking facilities.
 * 
 * @requires express - Web framework types
 * @requires ../services/ParkService - Parking lot business logic
 */

import { Request, Response } from 'express';
import { ParkService } from '../services/ParkService.ts';

/**
 * ParkController class handles all parking lot-related HTTP requests
 * @class
 */
export class ParkController {
  private readonly ParkService: ParkService;

  /**
   * Creates an instance of ParkController
   * @constructor
   */
  constructor() {
    this.ParkService = new ParkService();
  }

  /**
   * Get all parking lots
   * @async
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   */
  async getAllParks(req: Request, res: Response): Promise<void> {
    try {
      const Parks = await this.ParkService.findAll();
      res.status(200).json(Parks);
    } catch (error) {
      console.error('Error fetching Parks:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Get parking lot by ID
   * @async
   * @param {Request} req - Express request object containing parking lot ID in params
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If parking lot not found
   */
  async getParkById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const Park = await this.ParkService.findById(id);
      if (!Park) {
        res.status(404).json({ message: 'Park not found' });
        return;
      }
      res.status(200).json(Park);
    } catch (error) {
      console.error('Error fetching Park:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Create a new parking lot
   * @async
   * @param {Request} req - Express request object containing parking lot data in body
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If parking lot data is invalid
   */
  async createPark(req: Request, res: Response): Promise<void> {
    try {
      const ParkData = req.body;
      const newPark = await this.ParkService.create(ParkData);
      res.status(201).json(newPark);
    } catch (error) {
      console.error('Error creating Park:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Update parking lot information
   * @async
   * @param {Request} req - Express request object containing parking lot ID in params and update data in body
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If parking lot not found
   */
  async updatePark(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const ParkData = req.body;
      const updatedPark = await this.ParkService.update(id, ParkData);
      if (!updatedPark) {
        res.status(404).json({ message: 'Park not found' });
        return;
      }
      res.status(200).json(updatedPark);
    } catch (error) {
      console.error('Error updating Park:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Delete a parking lot
   * @async
   * @param {Request} req - Express request object containing parking lot ID in params
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If parking lot not found
   */
  async deletePark(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.ParkService.delete(id);
      if (!success) {
        res.status(404).json({ message: 'Park not found' });
        return;
      }
      res.status(200).json({ message: 'Park deleted successfully' });
    } catch (error) {
      console.error('Error deleting Park:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
} 