/**
 * @fileoverview Parking lot management routes for the CPMS application.
 * This file defines all parking lot-related endpoints including CRUD operations
 * for managing parking facilities.
 * 
 * @requires express - Web framework
 * @requires ../controllers/ParkController - Parking lot business logic
 * @requires ../middlewares/auth - Authentication middleware
 */

import { Router } from 'express';
import { ParkController } from '../controllers/ParkController.ts';
import { JwtAuthenticater } from '../middlewares/auth.ts';

const router = Router();
const parkController = new ParkController();

/**
 * Parking Lot Management Routes
 * All routes require JWT authentication for security
 * 
 * @route GET /parks
 * @description Get all parking lots
 * @middleware JwtAuthenticater
 * 
 * @route GET /parks/:id
 * @description Get parking lot by ID
 * @middleware JwtAuthenticater
 * 
 * @route POST /parks
 * @description Create a new parking lot
 * @middleware JwtAuthenticater
 * 
 * @route PUT /parks/:id
 * @description Update parking lot information
 * @middleware JwtAuthenticater
 * 
 * @route DELETE /parks/:id
 * @description Delete a parking lot
 * @middleware JwtAuthenticater
 */
router.get('/parks', JwtAuthenticater, parkController.getAllParks.bind(parkController));
router.get('/parks/:id', JwtAuthenticater, parkController.getParkById.bind(parkController));
router.post('/parks', JwtAuthenticater, parkController.createPark.bind(parkController));
router.put('/parks/:id', JwtAuthenticater, parkController.updatePark.bind(parkController));
router.delete('/parks/:id', JwtAuthenticater, parkController.deletePark.bind(parkController));

export const parkRoutes = router;
