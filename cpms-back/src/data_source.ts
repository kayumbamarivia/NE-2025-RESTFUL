/**
 * @fileoverview Database configuration and connection setup using TypeORM.
 * This file defines the database connection parameters and entity mappings.
 * 
 * @requires reflect-metadata - Required for TypeORM decorators
 * @requires typeorm - ORM library
 * @requires ./models/* - Entity models
 * @requires ./utils/HistorySubscriber - History tracking subscriber
 */

import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User.ts";
import { HistorySubscriber } from "./utils/HistorySubscriber.ts";
import { History } from "./models/History.ts";
import { Vehicle } from "./models/Vehicle.ts";
import { Park } from "./models/Park.ts";
// import { Booking } from "./models/Booking.ts";
// import { Notification } from "./models/Notification.ts";
// import { Payment } from "./models/Payment.ts"

/**
 * TypeORM DataSource configuration for the CPMS application
 * @type {DataSource}
 * 
 * @property {string} type - Database type (MySQL)
 * @property {string} host - Database host
 * @property {number} port - Database port
 * @property {string} username - Database username
 * @property {string} password - Database password
 * @property {string} database - Database name
 * @property {boolean} synchronize - Auto-synchronize database schema
 * @property {Array} logging - Logging configuration
 * @property {Array} entities - Entity models to be managed by TypeORM
 * @property {Array} migrations - Migration configuration
 * @property {Array} subscribers - Event subscribers
 */
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "cpms",
  synchronize: true, 
  logging: [],
  entities: [User, History, Park, Vehicle],
  migrations: ["query"],
  subscribers: [HistorySubscriber],
});