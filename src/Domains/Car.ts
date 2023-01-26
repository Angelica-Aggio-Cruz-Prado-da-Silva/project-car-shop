import ICar from '../Interfaces/ICar';

class Cars {
  protected model: string;
  protected year: number;
  protected color: string;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;
  protected status?: boolean;
  protected id?: string;

  constructor(car: ICar) {
    this.model = car.model;
    this.year = car.year;
    this.color = car.color;
    this.buyValue = car.buyValue;
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
    this.status = car.status || false;
    this.id = car.id;
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
    
  public getDoorsQty() {
    return this.doorsQty;
  }
    
  public setDoorsQty(doorsQty: number) {
    this.doorsQty = doorsQty;
  }
    
  public getSeatsQty() {
    return this.seatsQty;
  }
    
  public setSeatsQty(seatsQty: number) {
    this.seatsQty = seatsQty;
  }
}

export default Cars;