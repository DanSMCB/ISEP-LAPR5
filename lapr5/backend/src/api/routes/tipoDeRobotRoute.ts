import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITipoDeRobotController from '../../controllers/IControllers/ITipoDeRobotController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/tipoDeRobot', route);

  const ctrl = Container.get(config.controllers.tipoDeRobot.name) as ITipoDeRobotController;

   route.post('/create',
    celebrate({
      body: Joi.object({
        descricao: Joi.string().required(),
        tarefas: Joi.array().items(Joi.object({
          tarefa: Joi.string().required()
        })).required()
      })
    }),
    (req, res, next) => ctrl.createTipoDeRobot(req, res, next) );

  route.put('/edit',
    celebrate({
      body: Joi.object({
        descricao: Joi.string().required(),
        tarefas: Joi.array().items(Joi.object({
          tarefa: Joi.string().required()
        })).required()
      }),
    }),
    (req, res, next) => ctrl.updateTipoDeRobot(req, res, next) ); 

  route.get('/listall',(req, res, next) => ctrl.getAllTipoDeRobot(req, res, next));
};