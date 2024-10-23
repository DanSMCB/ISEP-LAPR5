import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IPassagemController from "../../controllers/IControllers/IPassagemController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use("/passagem", route);

  const ctrl = Container.get(
    config.controllers.passagem.name
  ) as IPassagemController;

  route.post(
    "/create",
    celebrate({
      body: Joi.object({
        passagemId: Joi.string().required(),
        connection: Joi.array()
          .items(
            Joi.object({
              edificio: Joi.string().required(),
              piso: Joi.string().required()
            })
          )
          .required()
      })
    }),
    (req, res, next) => ctrl.createPassagem(req, res, next)
  );

  route.put(
    "/edit",
    celebrate({
      body: Joi.object({
        passagemId: Joi.string().required(),
        connection: Joi.array()
          .items(
            Joi.object({
              edificio: Joi.string().required(),
              piso: Joi.string().required()
            })
          )
          .required()
      })
    }),
    (req, res, next) => ctrl.updatePassagem(req, res, next)
  );

  route.get("/listbetweenEdificio/:edificio1/:edificio2",
    (req, res, next) => ctrl.listPassagemBetweenEdificios(req, res, next)
  );
};