import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IElevadorController from '../../controllers/IControllers/IElevadorController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/elevador', route);

  const ctrl = Container.get(config.controllers.elevador.name) as IElevadorController;

   route.post('/create',
    celebrate({
      body: Joi.object({
        codigo: Joi.string().required(),
        edificio: Joi.string().required(),
        pisos: Joi.array().items(Joi.object({
          piso: Joi.string().required()
        })).required()
      })
    }),
    (req, res, next) => ctrl.createElevador(req, res, next) );

    route.put('/edit',
    celebrate({
      body: Joi.object({
        codigo: Joi.string().required(),
        edificio: Joi.string().required(),
        pisos: Joi.array().items(Joi.object({
          piso: Joi.string().required()
        })).required()
      })
    }),
    (req, res, next) => ctrl.updateElevador(req, res, next) );

  route.get("/:edificio", (req, res, next) => ctrl.getAllElevadoresByEdificio(req, res, next));
};