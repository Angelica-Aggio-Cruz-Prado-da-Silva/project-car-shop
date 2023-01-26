import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarsController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async createCar() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    const createdCar = await this.service.createNewCar(car);
    return this.res.status(201).json(createdCar);
  }

  public async getCars() {
    const cars = await this.service.getCars();
    return this.res.status(200).json(cars);
  }

  public async getCarById() {
    const { id } = this.req.params;
    try {
      const car = await this.service.getCarById(id);
      return this.res.status(200).json(car);
    } catch (error) { return this.next(error); }
  }

  public async updateCar() {
    const { id } = this.req.params;
    const dataToUpdate = { ...this.req.body };
    try {
      const updatedCar = await this.service.updateCar(id, dataToUpdate);
      return this.res.status(200).json(updatedCar);
    } catch (error) { return this.next(error); }
  }
}

export default CarsController;