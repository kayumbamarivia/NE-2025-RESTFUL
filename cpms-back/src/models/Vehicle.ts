/**
 * @fileoverview Vehicle entity model for the CPMS application.
 * This file defines the database schema and relationships for the Vehicle entity,
 * including its association with users and parking facilities.
 * 
 * @requires typeorm - ORM library
 * @requires ./User - User entity for relationship
 * @requires ./Park - Park entity for relationship
 */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.ts";
import { Park } from "./Park.ts";
// import { Booking } from "./Booking.ts";

/**
 * Vehicle entity representing a vehicle in the parking system
 * @class
 * @property {number} id - Unique identifier
 * @property {string} plateNumber - Vehicle's license plate number
 * @property {Park} park - Associated parking facility
 * @property {User} user - Vehicle owner/user
 * @property {Date} entryTime - Vehicle entry timestamp
 * @property {Date} exitTime - Vehicle exit timestamp
 * @property {number} chargedAmount - Parking fee amount
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */
@Entity({ name: "vehicles" })
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "plate_number", type: "varchar", length: 255 })
  plateNumber: string;

  @ManyToOne(() => Park)
  @JoinColumn({ name: "park_id" })
  park: Park;

  @ManyToOne(() => User, user => user.vehicles)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "entry_time", type: "datetime", nullable: true })
  entryTime: Date;

  @Column({ name: "exit_time", type: "datetime", nullable: true })
  exitTime: Date;

  @Column({ name: "charged_amount", type: "float", nullable: true, default: 0 })
  chargedAmount: number;

//   @OneToMany(() => Booking, booking => booking.vehicle)
//   bookings: Booking[];

  @CreateDateColumn({ name: "created_at", type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "datetime" })
  updatedAt: Date;
}
