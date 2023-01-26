import IVehicle from '../Interfaces/IVehicle';

class Vehicle {
  protected model: string;
  protected year: number;
  protected color: string;
  protected buyValue: number; 
  protected status?: boolean;
  protected id?: string;

  constructor(vehicle: IVehicle) {
    this.model = vehicle.model;
    this.year = vehicle.year;
    this.color = vehicle.color;
    this.buyValue = vehicle.buyValue;
    this.status = vehicle.status || false;
    this.id = vehicle.id;
  }
  
  public setId(id:string) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }
      
  public setModel(model: string) {
    this.model = model;
  }
      
  public getModel() {
    return this.model;
  }
      
  public setYear(year: number) {
    this.year = year;
  }
      
  public getYear() {
    return this.year;
  }
      
  public setColor(color: string) {
    this.color = color;
  }
      
  public getColor() {
    return this.color;
  }
  
  public getStatus() {
    return this.status;
  }

  public setStatus(status: boolean) {
    this.status = status;
  }
      
  public getBuyValue() {
    return this.buyValue;
  }
    
  public setBuyValue(buyValue: number) {
    this.buyValue = buyValue;
  }
}

export default Vehicle;