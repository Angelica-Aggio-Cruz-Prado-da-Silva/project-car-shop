import { Router } from 'express';
import CarsController from '../Controllers/CarsController';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

routes.post(
  '/cars',
  (req, res, next) => new CarsController(req, res, next).createCar(),
);

routes.get(
  '/cars',
  (req, res, next) => new CarsController(req, res, next).getCars(),
);

routes.get(
  '/cars/:id',
  (req, res, next) => new CarsController(req, res, next).getCarById(),
);

routes.put(
  '/cars/:id',
  (req, res, next) => new CarsController(req, res, next).updateCar(),
);

routes.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).createMotorcycle(),
);

routes.get(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).getMotorcyles(),
);

routes.get(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).getMotorcycleById(),
);

routes.put(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).updateMotorcycle(),
);

export default routes;