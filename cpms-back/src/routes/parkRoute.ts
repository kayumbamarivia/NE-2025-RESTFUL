import { Router } from 'express';
import { ParkController } from '../controllers/ParkController.ts';
import { JwtAuthenticater } from '../middlewares/auth.ts';

const router = Router();
const parkController = new ParkController();

router.get('/parks', JwtAuthenticater, parkController.getAllParks.bind(parkController));
router.get('/parks/:id', JwtAuthenticater, parkController.getParkById.bind(parkController));
router.post('/parks', JwtAuthenticater, parkController.createPark.bind(parkController));
router.put('/parks/:id', JwtAuthenticater, parkController.updatePark.bind(parkController));
router.delete('/parks/:id', JwtAuthenticater, parkController.deletePark.bind(parkController));

export const parkRoutes = router;
