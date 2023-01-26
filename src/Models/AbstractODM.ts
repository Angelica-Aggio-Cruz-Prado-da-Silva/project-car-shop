import { 
  Model,
  Schema,
  models,
  model,
  UpdateQuery,
  isValidObjectId, 
} from 'mongoose';
  
abstract class AbstractODM<T> {
  private schema: Schema<T>;
  private _model: Model<T>;
  private modelName: string;
  
  constructor(schema: Schema<T>, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this._model = models[this.modelName] || model(this.modelName, this.schema);
  }
  
  protected get model(): Model<T> {
    return this._model;
  }
  
  public async findAll() {
    return this._model.find();
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async findById(id: string) {
    return this._model.findOne({ id });
  }
  
  public async updateOne(
    _id: string,
    obj: Partial<T>,
  ): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('Invalid Mongo id');
  
    return this._model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }
}
  
export default AbstractODM;