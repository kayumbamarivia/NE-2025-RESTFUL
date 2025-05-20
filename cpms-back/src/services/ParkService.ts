import { ParkRepository } from '../repositories/ParkRepository.ts';
import { Park } from '../models/Park.ts';

export class ParkService {
  async findAll(): Promise<Park[]> {
    return ParkRepository.find();
  }

  async findById(id: number): Promise<Park | null> {
    return ParkRepository.findOneBy({ id });
  }

  async create(ParkData: Partial<Park>): Promise<Park> {
    const Park = ParkRepository.create(ParkData);
    return ParkRepository.save(Park);
  }

  async update(id: number, ParkData: Partial<Park>): Promise<Park | null> {
    await ParkRepository.update(id, ParkData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await ParkRepository.delete(id);
    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }
} 