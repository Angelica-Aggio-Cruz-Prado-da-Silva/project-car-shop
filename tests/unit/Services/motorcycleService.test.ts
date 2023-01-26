import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Motorcycles from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

describe('Testa a camada service de motorcycle', function () {
  const modelMotorcycle = 'Honda Cbr 1000rr';
  it('Deve buscar todos as motorcycles com SUCESSO', async function () {
    // Arrange
    const motorcycleOutput = ([
      {
        id: '634852326b35b59438fbea2f',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea31',
        model: modelMotorcycle,
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      },
    ]);
    sinon.stub(Model, 'find').resolves(motorcycleOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.getMotorcyles();

    // Assert
    expect(result).to.be.deep.equal(motorcycleOutput);

    sinon.restore();
  });

  it('Deve buscar uma motorcycle por id com SUCESSO', async function () {
    // Arrange
    const motorcycleOutput: Motorcycles = new Motorcycles(  
      {
        id: '634852326b35b59438fbea31',
        model: modelMotorcycle,
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      },
    );
    sinon.stub(Model, 'findOne').resolves(motorcycleOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.getMotorcycleById('634852326b35b59438fbea31');

    // Assert
    expect(result).to.be.deep.equal(motorcycleOutput);

    sinon.restore();
  });

  it('Deve fazer o update de uma motorcycle por id com SUCESSO', async function () {
    // Arrange
    const motorcycleOutput: Motorcycles = new Motorcycles({
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f Hornet',
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    });
    const motorcycleInput: IMotorcycle = {
      model: 'Honda',
      year: 2014,
      color: 'Blue',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };

    sinon.stub(Model, 'findOne').resolves(motorcycleOutput);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);

    // Act
    const service = new MotorcycleService();
    const validId = await service.getMotorcycleById('634852326b35b59438fbea31');
    const result = await service.updateMotorcycle('634852326b35b59438fbea31', motorcycleInput);

    // Assert
    expect(validId).to.be.deep.equal(motorcycleOutput);
    expect(result).to.be.deep.equal(motorcycleOutput);

    sinon.restore();
  });

  it('Deve lançar um erro sendo o id invalido', async function () {
    const motorcycle: IMotorcycle = {
      model: 'Honda Cbr 1000rr',
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.900,
      category: 'Street',
      engineCapacity: 1000,
    };
    sinon.stub(Model, 'findOne').resolves({ motorcycle });

    try {
      const service = new MotorcycleService();
      await service.getMotorcycleById('invalidId');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Deve criar uma motorcycle com SUCESSO', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Honda Shadow Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
 
    const motorcycleOutput: Motorcycles = new Motorcycles({
      id: '6348513f34c397abcad040b2',
      model: 'Honda Shoadow Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    });
    sinon.stub(Model, 'create').resolves(motorcycleOutput);
  
    // Act
    const service = new MotorcycleService();
    const result = await service.createNewMotorcycle(motorcycleInput);
  
    // Assert
    expect(result).to.be.deep.equal(motorcycleOutput);
  });
});