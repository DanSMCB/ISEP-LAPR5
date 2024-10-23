import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotController from '../../controllers/IControllers/IRobotController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/robot', route);

  const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

   route.post('/create',
    celebrate({
      body: Joi.object({
        numeroSerie: Joi.string().required(),
        codigo: Joi.string().required(),
        nickname: Joi.string().required(),
        marca: Joi.string().required(),
        estado: Joi.string().required(),
        tipoDeRobot: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createRobot(req, res, next) );

  route.put('/edit',
    celebrate({
      body: Joi.object({
        numeroSerie: Joi.string().required(),
        codigo: Joi.string().required(),
        nickname: Joi.string().required(),
        marca: Joi.string().required(),
        estado: Joi.string().required(),
        tipoDeRobot: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.updateRobot(req, res, next) ); 

    route.get('/listall',(req, res, next) => ctrl.getAllRobot(req, res, next));

    route.get('/:numeroSerie',(req, res, next) => ctrl.getRobot(req, res, next));
    
    route.patch('/inhibit',(req, res, next) => ctrl.inhibitRobot(req, res, next));
};