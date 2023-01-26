import IMotorcyle from '../Interfaces/IMotorcycle';

class Motorcycle {
  protected model: string;
  protected year: number;
  protected color: string;
  protected buyValue: number;
  private category: string;
  private engineCapacity: number;
  protected status?: boolean;
  protected id?: string;

  constructor(motorcycle: IMotorcyle) {
    this.model = motorcycle.model;
    this.year = motorcycle.year;
    this.color = motorcycle.color;
    this.buyValue = motorcycle.buyValue;
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
    this.status = motorcycle.status || false;
    this.id = motorcycle.id;
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
    
  public getCategory() {
    return this.category;
  }
    
  public setCategory(category: string) {
    this.category = category;
  }
    
  public getEngineCapacity() {
    return this.engineCapacity;
  }
    
  public setEngineCapacity(engineCapacity: number) {
    this.engineCapacity = engineCapacity;
  }
}

export default Motorcycle;