import { VehicleRepository } from '../repositories/VehicleRepository.ts';
import { ParkRepository } from '../repositories/ParkRepository.ts';
import { Vehicle } from '../models/Vehicle.ts';
import { randomUUID } from 'crypto';
import { Between } from 'typeorm';

export class VehicleService {
  async findAll(): Promise<Vehicle[]> {
    return VehicleRepository.find({ relations: ['user', 'park'] });
  }

  async findById(id: number): Promise<Vehicle | null> {
    return VehicleRepository.findOne({ where: { id }, relations: ['user', 'park'] });
  }

  async create(vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    const park = await ParkRepository.findOneBy({ id: vehicleData.park?.id });

    if (!park) throw new Error('Park not found');
    if (park.numberOfAvailableSpaces <= 0) throw new Error('No space available in this park');

    const vehicle = VehicleRepository.create({
      ...vehicleData,
      entryTime: new Date()
    });

    await VehicleRepository.save(vehicle);

    park.numberOfAvailableSpaces -= 1;
    await ParkRepository.save(park);

    return vehicle;
  }

  async update(id: number, data: Partial<Vehicle>): Promise<Vehicle | null> {
    const vehicle = await this.findById(id);
    if (!vehicle) return null;

    // If exitTime is added, calculate charged amount
    if (data.exitTime && !vehicle.exitTime) {
      const entry = vehicle.entryTime;
      const exit = new Date(data.exitTime);
      const durationInHours = Math.ceil((exit.getTime() - entry.getTime()) / (1000 * 60 * 60));

      const park = await ParkRepository.findOneBy({ id: vehicle.park.id });
      if (park) {
        data.chargedAmount = durationInHours * parseFloat(park.chargingFeePerHr.toString());
        park.numberOfAvailableSpaces += 1;
        await ParkRepository.save(park);
      }
    }

    await VehicleRepository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const vehicle = await this.findById(id);
    if (!vehicle) return false;

    // Free up space if the vehicle has not exited
    if (!vehicle.exitTime) {
      const park = await ParkRepository.findOneBy({ id: vehicle.park.id });
      if (park) {
        park.numberOfAvailableSpaces += 1;
        await ParkRepository.save(park);
      }
    }

    const result = await VehicleRepository.delete(id);
    return result.affected != null && result.affected > 0;
  }

   async vehicleEntry(vehicleData: Partial<Vehicle>): Promise<any> {
    const park = await ParkRepository.findOneBy({ code: vehicleData.park?.code });

    if (!park) throw new Error("Park not found");
    if (park.numberOfAvailableSpaces <= 0) throw new Error("No available space");

    const ticketCode = randomUUID();
    const vehicle = VehicleRepository.create({
      ...vehicleData,
      entryTime: new Date(),
    });

    // Save vehicle
    const savedVehicle = await VehicleRepository.save(vehicle);

    // Decrease available spaces
    park.numberOfAvailableSpaces -= 1;
    await ParkRepository.save(park);

    return {
      message: "Vehicle entered. Ticket generated.",
      ticket: {
        ticketCode,
        plateNumber: vehicle.plateNumber,
        parkingCode: park.code,
        entryTime: vehicle.entryTime,
        parkingName: park.parkingName,
      },
    };
  }


  async vehicleExit(id: number): Promise<any> {
  const vehicle = await VehicleRepository.findOneBy({ id });
  if (!vehicle || !vehicle.entryTime) throw new Error("Vehicle not found or entry time missing");

  const exitTime = new Date();
  const durationInMs = exitTime.getTime() - new Date(vehicle.entryTime).getTime();
  const durationInHours = Math.ceil(durationInMs / (1000 * 60 * 60)); // Round up to nearest hour

  const park = await ParkRepository.findOneBy({ code: vehicle.park?.code });
  if (!park) throw new Error("Park not found");

  const amount = durationInHours * Number(park.chargingFeePerHr);

  vehicle.exitTime = exitTime;
  vehicle.chargedAmount = amount;
  await VehicleRepository.save(vehicle);

  // Increase available spaces
  park.numberOfAvailableSpaces += 1;
  await ParkRepository.save(park);

  return {
    message: "Vehicle exited. Billing complete.",
    bill: {
      plateNumber: vehicle.plateNumber,
      duration: `${durationInHours} hour(s)`,
      amountCharged: `${amount.toFixed(2)} RWF`,
      exitTime,
    },
  };
}

async getExitedVehiclesBetweenDates(start: Date, end: Date) {
  const vehicles = await VehicleRepository.find({
    where: {
      exitTime: Between(start, end)
    }
  });

  const totalCharged = vehicles.reduce((sum, v) => sum + (v.chargedAmount || 0), 0);

  return {
    totalCharged,
    vehicles
  };
}

async getEnteredVehiclesBetweenDates(start: Date, end: Date) {
  const vehicles = await VehicleRepository.find({
    where: {
      entryTime: Between(start, end)
    }
  });

  return vehicles;
}



}
