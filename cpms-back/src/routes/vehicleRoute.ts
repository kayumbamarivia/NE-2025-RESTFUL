/**
 * @fileoverview Vehicle management routes for the CPMS application.
 * This file defines all vehicle-related endpoints including CRUD operations,
 * vehicle entry/exit management, and vehicle tracking.
 * 
 * @requires express - Web framework
 * @requires ../controllers/VehicleController - Vehicle business logic
 * @requires ../middlewares/auth - Authentication middleware
 */

import { Router } from 'express';
import { VehicleController } from '../controllers/VehicleController.ts';
import { JwtAuthenticater } from '../middlewares/auth.ts';

const router = Router();
const vehicleController = new VehicleController();

/**
 * Vehicle Management Routes
 * 
 * @route GET /vehicles
 * @description Get all vehicles (requires authentication)
 * @middleware JwtAuthenticater
 * 
 * @route GET /vehicles/:id
 * @description Get vehicle by ID
 * 
 * @route POST /vehicles
 * @description Create a new vehicle (requires authentication)
 * @middleware JwtAuthenticater
 * 
 * @route PUT /vehicles/:id
 * @description Update vehicle information (requires authentication)
 * @middleware JwtAuthenticater
 * 
 * @route DELETE /vehicles/:id
 * @description Delete a vehicle (requires authentication)
 * @middleware JwtAuthenticater
 */
router.get('/vehicles', JwtAuthenticater, vehicleController.getAllVehicles.bind(vehicleController));
router.get('/vehicles/:id', vehicleController.getVehicleById.bind(vehicleController));
router.post('/vehicles', JwtAuthenticater, vehicleController.createVehicle.bind(vehicleController));
router.put('/vehicles/:id', JwtAuthenticater, vehicleController.updateVehicle.bind(vehicleController));
router.delete('/vehicles/:id', JwtAuthenticater, vehicleController.deleteVehicle.bind(vehicleController));

/**
 * Vehicle Entry/Exit Management Routes
 * 
 * @route POST /vehicles/entry
 * @description Handle vehicle entry and generate parking ticket
 * @middleware JwtAuthenticater
 * 
 * @route POST /vehicles/exit/:id
 * @description Handle vehicle exit and generate parking bill
 * @middleware JwtAuthenticater
 * 
 * @route GET /vehicles/exits
 * @description Get list of vehicles that exited between specified dates
 * 
 * @route GET /vehicles/entries
 * @description Get list of vehicles that entered between specified dates
 */
router.post('/vehicles/entry', JwtAuthenticater, vehicleController.vehicleEntry.bind(vehicleController));
router.post('/vehicles/exit/:id', JwtAuthenticater, vehicleController.vehicleExit.bind(vehicleController));
router.get('/vehicles/exits', vehicleController.getExitedVehiclesBetweenDates.bind(vehicleController));
router.get('/vehicles/entries', vehicleController.getEnteredVehiclesBetweenDates.bind(vehicleController));

export const vehicleRoutes = router;
