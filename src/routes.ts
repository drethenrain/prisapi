import { Router } from 'express';
import UserController from './controllers/UserController';

export const route = Router();

route
  .get('/users', UserController.findALl)
  .get('/users/:id', UserController.findById)
  .post('/users', UserController.create)
  .put('/users/:id', UserController.update)
  .delete('/users/:id', UserController.delete);
