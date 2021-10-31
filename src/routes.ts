import { Router } from 'express';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';

export const route = Router();

route
  .get('/users', UserController.findALl)
  .get('/users/:id', UserController.findById)
  .post('/users', UserController.create)
  .put('/users/:id', UserController.update)
  .delete('/users/:id', UserController.delete)

  // Auth
  .post('/login', AuthController.login);
