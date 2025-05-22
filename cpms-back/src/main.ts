/**
 * @fileoverview Main application entry point for the CPMS (Car Parking Management System) backend.
 * This file sets up the Express server, middleware, routes, and database connection.
 * 
 * @requires reflect-metadata - Required for TypeORM decorators
 * @requires dotenv/config - Environment variable configuration
 * @requires express - Web framework
 * @requires swagger-ui-express - API documentation
 * @requires morgan - HTTP request logger
 * @requires cors - Cross-Origin Resource Sharing
 * @requires helmet - Security middleware
 * @requires ./data_source - Database connection configuration
 */

import "reflect-metadata";
import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.ts"
import morgan from "morgan";
import cors from "cors";
import { log } from "node:console";
import helmet from "helmet";
import { AppDataSource } from "./data_source.ts";
import { userRoutes } from "./routes/userRoute.ts";
import { emailRoutes } from "./routes/emailRoute.ts";
import { parkRoutes } from './routes/parkRoute.ts';
import { vehicleRoutes } from './routes/vehicleRoute.ts';
// import { bookingRoutes } from './routes/bookingRoute.ts';
// import { notificationRoutes } from './routes/notificationRoute.ts';
// import { historyRoutes } from './routes/historyRoute.ts';

/**
 * Express application instance
 * @type {express.Application}
 */
const app = express();

/**
 * Apply middleware stack
 * - CORS: Enable Cross-Origin Resource Sharing
 * - Helmet: Set security-related HTTP headers
 * - JSON: Parse JSON request bodies
 * - Morgan: HTTP request logging
 * - Swagger: API documentation
 */
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));
app.use("/rest/cpms/api/docs",swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * Initialize database connection using TypeORM
 * @async
 * @function initializeDatabase
 */
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection initialized");
  })
  .catch((error) => console.log("Database connection error: ", error));

/**
 * Register API routes
 * All routes are prefixed with '/rest/cpms/api/v1'
 */
app.use("/rest/cpms/api/v1", userRoutes);
app.use("/rest/cpms/api/v1", emailRoutes);
app.use('/rest/cpms/api/v1', parkRoutes);
app.use('/rest/cpms/api/v1', vehicleRoutes);
// app.use('/rest/pms/api/v1', bookingRoutes);
// app.use('/rest/pms/api/v1', notificationRoutes);
// app.use('/rest/pms/api/v1', historyRoutes);

/**
 * Base route handler for API status check
 * @route GET /api/status
 * @returns {Object} API status and current timestamp
 */
app.get("/api/status", (req, res) => {
  res.json({ status: "API is running", time: new Date() });
});

/**
 * Global error handling middleware
 * @param {Error} err - Error object
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next function
 */
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

/**
 * Start the Express server
 * @listens {process.env.PORT} - Port number from environment variables
 */
app.listen(process.env.PORT, () => {
    log(`API documentation on ${process.env.SWAGGER_URL}`);
}
);