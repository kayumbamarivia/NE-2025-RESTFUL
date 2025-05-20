import { Router } from "express";
import { UserController } from "../controllers/UserController.ts";
import { JwtAuthenticater, protect, restrictTo } from "../middlewares/auth.ts";
import { Role } from '../enums/Role.ts';

const router = Router();
const userController = new UserController();

// Option 1: Using JwtAuthenticater
router.get("/users", JwtAuthenticater, userController.getAllUsers.bind(userController));
router.get("/users/:id", JwtAuthenticater, userController.getUserById.bind(userController));
router.post("/register", userController.createUser.bind(userController));
router.put("/users/:id", JwtAuthenticater, userController.updateUser.bind(userController));
router.delete("/users/:id", JwtAuthenticater, userController.deleteUser.bind(userController));
router.post("/login", userController.login.bind(userController));
router.patch("/users/:id/role", JwtAuthenticater, userController.changeUserRole.bind(userController));

// Option 2: Using protect and restrictTo (if you need role-based access)
// For admin-only routes
// router.get("/users", protect, restrictTo(Role.ADMIN), userController.getAllUsers.bind(userController));
// router.patch("/users/:id/role", protect, restrictTo(Role.ADMIN), userController.changeUserRole.bind(userController));

// For authenticated user routes
// router.get("/users/:id", protect, userController.getUserById.bind(userController));
// router.put("/users/:id", protect, userController.updateUser.bind(userController));
// router.delete("/users/:id", protect, userController.deleteUser.bind(userController));

export { router as userRoutes };