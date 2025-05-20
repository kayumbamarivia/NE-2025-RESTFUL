import { Router } from 'express';
import { VehicleController } from '../controllers/VehicleController.ts';
import { JwtAuthenticater } from '../middlewares/auth.ts';

const router = Router();
const vehicleController = new VehicleController();

router.get('/vehicles', JwtAuthenticater, vehicleController.getAllVehicles.bind(vehicleController));
router.get('/vehicles/:id', vehicleController.getVehicleById.bind(vehicleController));
router.post('/vehicles', JwtAuthenticater, vehicleController.createVehicle.bind(vehicleController));
router.put('/vehicles/:id', JwtAuthenticater, vehicleController.updateVehicle.bind(vehicleController));
router.delete('/vehicles/:id', JwtAuthenticater, vehicleController.deleteVehicle.bind(vehicleController));

// ✅ NEW: Route to handle vehicle entry and generate ticket
router.post('/vehicles/entry', JwtAuthenticater, vehicleController.vehicleEntry.bind(vehicleController));

// ✅ NEW: Route to handle vehicle exit and generate bill
router.post('/vehicles/exit/:id', JwtAuthenticater, vehicleController.vehicleExit.bind(vehicleController));

router.get('/vehicles/exits', vehicleController.getExitedVehiclesBetweenDates.bind(vehicleController));
router.get('/vehicles/entries', vehicleController.getEnteredVehiclesBetweenDates.bind(vehicleController));


export const vehicleRoutes = router;
