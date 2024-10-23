import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITarefaController from '../../controllers/IControllers/ITarefaController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/tarefa', route);

  const ctrl = Container.get(config.controllers.tarefa.name) as ITarefaController;

  route.post('/create',
  celebrate({
    body: Joi.object({
      codigo: Joi.string().required(),
      descricao: Joi.string().required(),
      robot: Joi.string().required(),
      tipoDeRobot: Joi.string().required(),
      estado: Joi.string().required(),
      contactoRequisitante: Joi.string().required(),
      tipoDeTarefa: Joi.string().required(),

      // No caso de se tratar de uma tarefa do tipo: vigilancia
      contactoIncidente: Joi.string(),
      edificio: Joi.string(),
      pisos: Joi.array().items(Joi.object({
        piso: Joi.string()
      })),

      // No caso de se tratar de uma tarefa do tipo: entrega de objetos
      salaRecolha: Joi.string(),
      salaEntrega: Joi.string(),
      contactoRecolha: Joi.string(),
      contactoEntrega: Joi.string()
    })
  }),
  (req, res, next) => ctrl.createTarefa(req, res, next));

  route.get('/listall',(req, res, next) => ctrl.getAllTarefa(req, res, next));

  route.get('/listallNaoAprovada',(req, res, next) => ctrl.getAllTarefaNaoAprovada(req, res, next));

  route.patch('/updateEstadoDaTarefa',(req, res, next) => ctrl.updateEstadoDaTarefa(req, res, next));
};