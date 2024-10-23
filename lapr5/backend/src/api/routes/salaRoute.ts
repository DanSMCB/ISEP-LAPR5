import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ISalaController from '../../controllers/IControllers/ISalaController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/sala', route);

  const ctrl = Container.get(config.controllers.sala.name) as ISalaController;

  route.post('/create',
  celebrate({
    body: Joi.object({
      nome: Joi.string().required(),
      descricao: Joi.string().required(),
      categoria: Joi.string().required(),
      tamanho: Joi.string().required(),
      edificio: Joi.string().required(),
      piso: Joi.string().required(),
    })
  }),
  (req, res, next) => ctrl.createSala(req, res, next) );

  route.put('/edit',
  celebrate({
    body: Joi.object({
      nome: Joi.string().required(),
      descricao: Joi.string().required(),
      categoria: Joi.string().required(),
      tamanho: Joi.number().required(),
      edificio: Joi.string().required(),
      piso: Joi.string().required(),
    })
  }),
  (req, res, next) => ctrl.createSala(req, res, next) );

  route.get('/listall',(req, res, next) => ctrl.getAllSala(req, res, next));
};