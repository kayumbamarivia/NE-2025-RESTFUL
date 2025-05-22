/**
 * @fileoverview User entity model for the CPMS application.
 * This file defines the database schema and relationships for the User entity.
 * 
 * @requires typeorm - ORM library
 * @requires ../enums/Role - User role definitions
 * @requires ./Vehicle - Vehicle entity for relationship
 */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Role } from "../enums/Role.ts";
import { Vehicle } from "./Vehicle.ts"; 
// import { Booking } from "./Booking.ts"; 
// import { Notification } from "./Notification.ts"; 

/**
 * User entity representing a system user
 * @class
 * @property {number} id - Unique identifier
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - Unique email address
 * @property {string} password - Hashed password (not selected by default)
 * @property {Role} role - User role (default: ATTENDANT)
 * @property {Vehicle[]} vehicles - Associated vehicles
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */
@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name", type: "varchar", length: 255 })
  firstName: string;

  @Column({ name: "last_name", type: "varchar", length: 255 })
  lastName: string;

  @Column({ unique: true, type: "varchar", length: 255 })
  email: string;

  @Column({ select: false, type: "varchar", length: 255 })
  password: string;

  @Column({ type: "enum", enum: Role, default: Role.ATTENDANT })
  role: string;

  @OneToMany(() => Vehicle, vehicle => vehicle.user)
  vehicles: Vehicle[]; 

  // @OneToMany(() => Booking, booking => booking.user) 
  // bookings: Booking[];

  //  @OneToMany(() => Notification, not => not.user)
  //   notifications: Notification[];

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;
}