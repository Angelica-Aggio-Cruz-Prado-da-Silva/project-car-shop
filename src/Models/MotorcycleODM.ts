import { Schema } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    super(schema, 'Motorcycle');
  }

  public async createMotorcycle() {
    return this.model.create();
  }

  public async findAll() {
    return this.model.find();
  }

  public async findMotorcycleById(id: string): Promise<IMotorcycle | null> {
    return this.model.findById(id);
  }
}

export default MotorcycleODM;