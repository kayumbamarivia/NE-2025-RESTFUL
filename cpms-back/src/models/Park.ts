import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { SlotStatus } from "../enums/SlotStatus.ts"
import { Vehicle } from "./Vehicle.ts"
// import { Booking } from "./Booking.ts"

@Entity({ name: "parks" })
export class Park {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "code", type: "varchar", length: 255 })
  code: string;

  @Column({ name: "parking_name", type: "varchar", length: 255 })
  parkingName: string;

  @Column({ name: "parking_location", type: "varchar", length: 255 })
  location: string;

  @Column({ name: "amount_per_hr", type: "decimal", precision: 10, scale: 2 })
  chargingFeePerHr: number;

  @Column({ name: "n_available", type: "integer" })
  numberOfAvailableSpaces: number;

  @Column({ name: "status", type: "enum", enum: SlotStatus, default: SlotStatus.AVAILABLE })
  status: SlotStatus;

  @OneToMany(() => Vehicle, vehicle => vehicle.park)
vehicles: Vehicle[];


//   @OneToMany(() => Booking, booking => booking.slot) 
//   bookings: Booking[];

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;
}