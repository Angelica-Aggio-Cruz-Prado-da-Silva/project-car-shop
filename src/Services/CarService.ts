import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  public createCar(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async createNewCar(car: ICar) {
    const carODM = new CarODM();
    const createdCar = await carODM.create(car);
    return this.createCar(createdCar);
  }

  public async getCars() {
    const carODM = new CarODM();
    const cars = await carODM.findAll();
    const validCars = cars.map((car) => this.createCar(car));
    return validCars;
  }

  public async getCarById(id: string) {
    const carODM = new CarODM();
    const isValid = isValidObjectId(id);
    if (!isValid) throw new Error('Invalid mongo id');
    const car = await carODM.findCarById(id);
    if (!car) throw new Error('Car not found');
    const validCar = this.createCar(car);
    return validCar;
  }

  public async updateCar(id: string, carToUpdate: ICar) {
    const carODM = new CarODM();
    const isValid = isValidObjectId(id);
    if (!isValid) throw new Error('Invalid mongo id');
    const car = await carODM.findCarById(id);
    if (!car) throw new Error('Car not found');
    const updatedCar = await carODM.updateOne(id, carToUpdate);
    return this.createCar(updatedCar);
  }
}

export default CarService;