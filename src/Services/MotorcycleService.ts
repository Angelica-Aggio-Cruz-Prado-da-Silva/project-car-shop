import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  public createMotorcycle(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async createNewMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const createdMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycle(createdMotorcycle);
  }

  public async getMotorcyles() {
    const motorcyleODM = new MotorcycleODM();
    const motorcycles = await motorcyleODM.findAll();
    const validMotorcycles = motorcycles.map((motorcycle) => this.createMotorcycle(motorcycle));
    return validMotorcycles;
  }

  public async getMotorcycleById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const isValid = isValidObjectId(id);
    if (!isValid) throw new Error('Invalid mongo id');
    const motorcycle = await motorcycleODM.findMotorcycleById(id);
    if (!motorcycle) throw new Error('Motorcycle not found');
    const validmotorcycle = this.createMotorcycle(motorcycle);
    return validmotorcycle;
  }

  public async updateMotorcycle(id: string, motorcycleToUpdate: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const isValid = isValidObjectId(id);
    if (!isValid) throw new Error('Invalid mongo id');
    const motorcycle = await motorcycleODM.findMotorcycleById(id);
    if (!motorcycle) throw new Error('Motorcycle not found');
    const updatedMotorcycle = await motorcycleODM.updateOne(id, motorcycleToUpdate);
    return this.createMotorcycle(updatedMotorcycle);
  }
}

export default MotorcycleService;