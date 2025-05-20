import { AppDataSource } from '../data_source.ts';
import { Park } from '../models/Park.ts';

export const ParkRepository = AppDataSource.getRepository(Park);
