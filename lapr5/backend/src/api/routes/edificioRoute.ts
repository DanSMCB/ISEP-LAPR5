import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IEdificioController from '../../controllers/IControllers/IEdificioController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/edificio', route);

  const ctrl = Container.get(config.controllers.edificio.name) as IEdificioController;

  route.post('/create',
    celebrate({
      body: Joi.object({
        codigo: Joi.string().required(),
        nome: Joi.string().required(),
        descricao: Joi.string().required(),
        pisoMaxSize: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createEdificio(req, res, next) );

  route.put('/edit',
    celebrate({
      body: Joi.object({
        codigo: Joi.string().required(),
        nome: Joi.string().required(),
        descricao: Joi.string().required(),
        pisoMaxSize: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updateEdificio(req, res, next) ); 

  route.get('/listall',(req, res, next) => ctrl.getAllEdificio(req, res, next));
    
  route.get('/:min/:max', (req, res, next) => ctrl.getAllEdificioMinMaxPiso(req, res, next));
};