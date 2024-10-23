import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IPisoController from "../../controllers/IControllers/IPisoController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use("/piso", route);

  const ctrl = Container.get(config.controllers.piso.name) as IPisoController;

  route.post(
    "/create",
    celebrate({
      body: Joi.object({
        edificio: Joi.string().required(),
        piso: Joi.string().required(),
        descricao: Joi.string().required(),
        passagens: Joi.string(),
        salas: Joi.string(),
      })
    }),
    (req, res, next) => ctrl.createPiso(req, res, next)
  );

  route.put(
    "/edit",
    celebrate({
      body: Joi.object({
        edificio: Joi.string().required(),
        piso: Joi.string().required(),
        descricao: Joi.string().required(),
        passagens: Joi.string(),
        salas: Joi.string(),
      })
    }),
    (req, res, next) => ctrl.updatePiso(req, res, next)
  );
  
  route.get("/listwithconnection", (req, res, next) =>
    ctrl.getPisosWithConnection(req, res, next)
  );

  route.get("/:edificio", (req, res, next) =>
    ctrl.getAllPisosByEdificio(req, res, next)
  );

  route.patch("/mapapiso", (req, res, next) =>
    ctrl.loadValidateFloor(req, res, next)
  );
};