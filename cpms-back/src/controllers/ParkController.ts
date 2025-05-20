import { Request, Response } from 'express';
import { ParkService } from '../services/ParkService.ts';

export class ParkController {
  private readonly ParkService: ParkService;

  constructor() {
    this.ParkService = new ParkService();
  }

  async getAllParks(req: Request, res: Response): Promise<void> {
    try {
      const Parks = await this.ParkService.findAll();
      res.status(200).json(Parks);
    } catch (error) {
      console.error('Error fetching Parks:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

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

  async createPark(req: Request, res: Response): Promise<void> {
    try {
      const ParkData = req.body;
      const savee = {...ParkData, status : 'available'};
      const newPark = await this.ParkService.create(savee);
      res.status(201).json(newPark);
    } catch (error) {
      console.error('Error creating Park:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

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