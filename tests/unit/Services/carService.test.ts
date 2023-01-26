import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Cars from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';

describe('Testa a camada service de Car', function () {
  it('Deve buscar todos os carros com SUCESSO', async function () {
    // Arrange
    const carOutput = ([
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: false, 
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: false, 
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ]);
    sinon.stub(Model, 'find').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.getCars();

    // Assert
    expect(result).to.be.deep.equal(carOutput);

    sinon.restore();
  });

  it('Deve buscar um carro por id com SUCESSO', async function () {
    // Arrange
    const carOutput: Cars = new Cars({
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    });
    sinon.stub(Model, 'findOne').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.getCarById('634852326b35b59438fbea2f');

    // Assert
    expect(result).to.be.deep.equal(carOutput);

    sinon.restore();
  });

  it('Deve fazer o update de um carro por id com SUCESSO', async function () {
    // Arrange
    const carOutput: Cars = new Cars({
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 4,
      seatsQty: 5,
    });

    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Blue',
      status: true,
      buyValue: 12.000,
      doorsQty: 4,
      seatsQty: 5,
    };
    sinon.stub(Model, 'findOne').resolves(carOutput);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);

    // Act
    const service = new CarService();
    const validId = await service.getCarById('634852326b35b59438fbea2f');
    const result = await service.updateCar('634852326b35b59438fbea2f', carInput);

    // Assert
    expect(validId).to.be.deep.equal(carOutput);
    expect(result).to.be.deep.equal(carOutput);

    sinon.restore();
  });

  it('Deve lançar um erro sendo o id invalido', async function () {
    const car: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    sinon.stub(Model, 'findOne').resolves({ car });

    try {
      const service = new CarService();
      await service.getCarById('invalidId');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Deve criar um carro com SUCESSO', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput: Cars = new Cars(
      {
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      },
    );
    sinon.stub(Model, 'create').resolves(carOutput);
  
    // Act
    const service = new CarService();
    const result = await service.createNewCar(carInput);
  
    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });
});