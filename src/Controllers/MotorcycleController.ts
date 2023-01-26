import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcyclesController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async createMotorcycle() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    const createdmotorcycle = await this.service.createNewMotorcycle(motorcycle);
    return this.res.status(201).json(createdmotorcycle);
  }

  public async getMotorcyles() {
    const motorcycles = await this.service.getMotorcyles();
    return this.res.status(200).json(motorcycles);
  }

  public async getMotorcycleById() {
    const { id } = this.req.params;
    try {
      const motorcycle = await this.service.getMotorcycleById(id);
      return this.res.status(200).json(motorcycle);
    } catch (error) { return this.next(error); }
  }

  public async updateMotorcycle() {
    const { id } = this.req.params;
    const dataToUpdate = { ...this.req.body };
    try {
      const updatedMotorcycle = await this.service.updateMotorcycle(id, dataToUpdate);
      return this.res.status(200).json(updatedMotorcycle);
    } catch (error) { return this.next(error); }
  }
}

export default MotorcyclesController;