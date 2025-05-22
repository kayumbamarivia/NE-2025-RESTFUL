/**
 * @fileoverview User management routes for the CPMS application.
 * This file defines all user-related endpoints including authentication, registration,
 * and user management operations.
 * 
 * @requires express - Web framework
 * @requires ../controllers/UserController - User business logic
 * @requires ../middlewares/auth - Authentication middleware
 * @requires ../enums/Role - User role definitions
 */

import { Router } from "express";
import { UserController } from "../controllers/UserController.ts";
import { JwtAuthenticater, protect, restrictTo } from "../middlewares/auth.ts";
import { Role } from '../enums/Role.ts';

const router = Router();
const userController = new UserController();

/**
 * User Management Routes
 * 
 * @route GET /users
 * @description Get all users (requires authentication)
 * @middleware JwtAuthenticater
 * 
 * @route GET /users/:id
 * @description Get user by ID (requires authentication)
 * @middleware JwtAuthenticater
 * 
 * @route POST /register
 * @description Register a new user
 * 
 * @route PUT /users/:id
 * @description Update user information (requires authentication)
 * @middleware JwtAuthenticater
 * 
 * @route DELETE /users/:id
 * @description Delete a user (requires authentication)
 * @middleware JwtAuthenticater
 * 
 * @route POST /login
 * @description Authenticate user and get JWT token
 * 
 * @route PATCH /users/:id/role
 * @description Change user role (requires authentication)
 * @middleware JwtAuthenticater
 */
router.get("/users", JwtAuthenticater, userController.getAllUsers.bind(userController));
router.get("/users/:id", JwtAuthenticater, userController.getUserById.bind(userController));
router.post("/register", userController.createUser.bind(userController));
router.put("/users/:id", JwtAuthenticater, userController.updateUser.bind(userController));
router.delete("/users/:id", JwtAuthenticater, userController.deleteUser.bind(userController));
router.post("/login", userController.login.bind(userController));
router.patch("/users/:id/role", JwtAuthenticater, userController.changeUserRole.bind(userController));

/**
 * Alternative Role-Based Access Control Routes (Commented Out)
 * These routes provide more granular control using protect and restrictTo middleware
 * 
 * @example
 * // Admin-only routes
 * router.get("/users", protect, restrictTo(Role.ADMIN), userController.getAllUsers.bind(userController));
 * router.patch("/users/:id/role", protect, restrictTo(Role.ADMIN), userController.changeUserRole.bind(userController));
 * 
 * // Authenticated user routes
 * router.get("/users/:id", protect, userController.getUserById.bind(userController));
 * router.put("/users/:id", protect, userController.updateUser.bind(userController));
 * router.delete("/users/:id", protect, userController.deleteUser.bind(userController));
 */

export { router as userRoutes };