/**
 * @fileoverview Vehicle management controller for the CPMS application.
 * This controller handles all vehicle-related operations including CRUD operations,
 * vehicle entry/exit management, and vehicle tracking.
 * 
 * @requires express - Web framework types
 * @requires ../services/VehicleService - Vehicle business logic
 */

import { Request, Response } from 'express';
import { VehicleService } from '../services/VehicleService.ts';

/**
 * VehicleController class handles all vehicle-related HTTP requests
 * @class
 */
export class VehicleController {
  private readonly vehicleService: VehicleService;

  /**
   * Creates an instance of VehicleController
   * @constructor
   */
  constructor() {
    this.vehicleService = new VehicleService();
  }

  /**
   * Get all vehicles
   * @async
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   */
  async getAllVehicles(req: Request, res: Response): Promise<void> {
    try {
      const vehicles = await this.vehicleService.findAll();
      res.status(200).json(vehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Get vehicle by ID
   * @async
   * @param {Request} req - Express request object containing vehicle ID in params
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If vehicle not found
   */
  async getVehicleById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const vehicle = await this.vehicleService.findById(id);
      if (!vehicle) {
        res.status(404).json({ message: 'Vehicle not found' });
        return;
      }
      res.status(200).json(vehicle);
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Create a new vehicle
   * @async
   * @param {Request} req - Express request object containing vehicle data in body
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If vehicle data is invalid
   */
  async createVehicle(req: Request, res: Response): Promise<void> {
    try {
      const vehicleData = req.body;
      const newVehicle = await this.vehicleService.create(vehicleData);
      res.status(201).json(newVehicle);
    } catch (error) {
      console.error('Error creating vehicle:', error);
      const message = (error instanceof Error) ? error.message : 'Error creating vehicle';
      res.status(400).json({ message });
    }
  }

  /**
   * Update vehicle information
   * @async
   * @param {Request} req - Express request object containing vehicle ID in params and update data in body
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If vehicle not found
   */
  async updateVehicle(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const vehicleData = req.body;
      const updated = await this.vehicleService.update(id, vehicleData);
      if (!updated) {
        res.status(404).json({ message: 'Vehicle not found' });
        return;
      }
      res.status(200).json(updated);
    } catch (error) {
      console.error('Error updating vehicle:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Delete a vehicle
   * @async
   * @param {Request} req - Express request object containing vehicle ID in params
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If vehicle not found
   */
  async deleteVehicle(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.vehicleService.delete(id);
      if (!success) {
        res.status(404).json({ message: 'Vehicle not found' });
        return;
      }
      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Handle vehicle entry into parking facility
   * @async
   * @param {Request} req - Express request object containing vehicle entry data in body
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If entry data is invalid
   */
  async vehicleEntry(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.vehicleService.vehicleEntry(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error('Entry error:', error);
      const message = (error instanceof Error) ? error.message : 'Entry error';
      res.status(400).json({ message });
    }
  }

  /**
   * Handle vehicle exit from parking facility
   * @async
   * @param {Request} req - Express request object containing vehicle ID in params
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If vehicle not found or exit data is invalid
   */
  async vehicleExit(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await this.vehicleService.vehicleExit(id);
      res.status(200).json(result);
    } catch (error) {
      console.error('Exit error:', error);
      const message = (error instanceof Error) ? error.message : 'Exit error';
      res.status(400).json({ message });
    }
  }

  /**
   * Get report of vehicles that exited between specified dates
   * @async
   * @param {Request} req - Express request object containing start and end dates in query
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If dates are invalid or missing
   */
  async getExitedVehiclesBetweenDates(req: Request, res: Response): Promise<void> {
    const { start, end } = req.query;

    if (!start || !end) {
      res.status(400).json({ message: "Start and end dates are required" });
      return;
    }

    const startDate = new Date(start as string);
    const endDate = new Date(end as string);

    const report = await this.vehicleService.getExitedVehiclesBetweenDates(startDate, endDate);
    res.json(report);
  }

  /**
   * Get list of vehicles that entered between specified dates
   * @async
   * @param {Request} req - Express request object containing start and end dates in query
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If dates are invalid or missing
   */
  async getEnteredVehiclesBetweenDates(req: Request, res: Response): Promise<void> {
    const { start, end } = req.query;

    if (!start || !end) {
      res.status(400).json({ message: "Start and end dates are required" });
      return;
    }

    const startDate = new Date(start as string);
    const endDate = new Date(end as string);

    const vehicles = await this.vehicleService.getEnteredVehiclesBetweenDates(startDate, endDate);
    res.json({ vehicles });
  }
}
