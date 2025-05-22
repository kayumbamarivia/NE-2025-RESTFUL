/**
 * @fileoverview User management controller for the CPMS application.
 * This controller handles all user-related operations including authentication,
 * registration, and user management.
 * 
 * @requires express - Web framework types
 * @requires ../services/UserService - User business logic
 * @requires ../utils/HistorySubscriber - History tracking
 * @requires ../utils/jwt - JWT token generation
 */

import { Request, Response } from "express";
import { UserService } from "../services/UserService.ts";
import { HistorySubscriber } from "../utils/HistorySubscriber.ts";
import { generateToken } from "../utils/jwt.ts";

/**
 * UserController class handles all user-related HTTP requests
 * @class
 */
export class UserController {
  private readonly userService: UserService;

  /**
   * Creates an instance of UserController
   * @constructor
   */
  constructor() {
    this.userService = new UserService();
  }

  /**
   * Get all users
   * @async
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   */
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Get user by ID
   * @async
   * @param {Request} req - Express request object containing user ID in params
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   */
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.findById(id);
      
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Create a new user
   * @async
   * @param {Request} req - Express request object containing user details in body
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If required fields are missing or email is already in use
   */
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, password } = req.body;
   
      if (!firstName || !lastName || !email || !password) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        res.status(409).json({ message: "Email already in use" });
        return;
      }
      
      const newUser = await this.userService.create({
        firstName,
        lastName,
        email,
        password,
        role: "attendant",
      });

      HistorySubscriber.setActionContext(email, "signup")
      
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Update user information
   * @async
   * @param {Request} req - Express request object containing user ID in params and update data in body
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If user not found or email is already in use
   */
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { firstName, lastName, email, password, role } = req.body;
   

      const user = await this.userService.findById(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      
      if (email && email !== user.email) {
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
          res.status(409).json({ message: "Email already in use" });
          return;
        }
      }
      
      const updateData: any = {};
      if (typeof firstName !== "undefined") updateData.firstName = firstName;
      if (typeof lastName !== "undefined") updateData.lastName = lastName;
      if (typeof email !== "undefined") updateData.email = email;
      if (typeof password !== "undefined") updateData.password = password;
      if (typeof role !== "undefined") updateData.role = role;

      const updatedUser = await this.userService.update(id, updateData);
      
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Delete a user
   * @async
   * @param {Request} req - Express request object containing user ID in params
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If user not found
   */
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      const user = await this.userService.findById(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      
      await this.userService.delete(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Authenticate user and generate JWT token
   * @async
   * @param {Request} req - Express request object containing email and password in body
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If credentials are invalid
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }
      
      const user = await this.userService.validateCredentials(email, password);
      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      
      const token = generateToken({email: user.email, id: user.id, role: user.role});

      res.status(200).json({
        message: "Login successful",
        user: user,
        token: token
      });

      HistorySubscriber.setActionContext(email, "signup")
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Change user role
   * @async
   * @param {Request} req - Express request object containing user ID in params and new role in body
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   * @throws {Error} If user not found or role is invalid
   */
  async changeUserRole(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { role } = req.body;
      
      if (!role) {
        res.status(400).json({ message: "Role is required" });
        return;
      }
      
      const user = await this.userService.findById(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      
      const updatedUser = await this.userService.changeRole(id, role);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error changing user role:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}