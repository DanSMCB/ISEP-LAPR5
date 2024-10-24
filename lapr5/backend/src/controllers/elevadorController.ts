import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IElevadorController from "./IControllers/IElevadorController";
import IElevadorService from '../services/IServices/IElevadorService';
import IElevadorDTO from '../dto/IElevadorDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class ElevadorController implements IElevadorController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.elevador.name) private elevadorServiceInstance : IElevadorService
  ) {}

  public async createElevador(req: Request, res: Response, next: NextFunction) {
    try {
      const elevadorOrError = await this.elevadorServiceInstance.createElevador(req.body as IElevadorDTO) as Result<IElevadorDTO>;
        
      if (elevadorOrError.isFailure) {
        return res.status(402).send();
      }

      const elevadorDTO = elevadorOrError.getValue();
      return res.json( elevadorDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateElevador(req: Request, res: Response, next: NextFunction) {
    try {
      const elevadorOrError = await this.elevadorServiceInstance.updateElevador(req.body as IElevadorDTO) as Result<IElevadorDTO>;

      if (elevadorOrError.isFailure) {
        return res.status(404).send();
      }

      const elevadorDTO = elevadorOrError.getValue();
      return res.status(201).json( elevadorDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAllElevadoresByEdificio(req: Request, res: Response, next: NextFunction) {
    try {
      const elevadorOrError = await this.elevadorServiceInstance.getAllElevadoresByEdificio(req.params.edificio as string);

      if (elevadorOrError.isFailure) {
        return res.status(404).send();
      }

      const elevadorDTOArray = elevadorOrError.getValue();

      return res.status(201).json(elevadorDTOArray);
    } catch (e) {
      return next(e);
    }
  }
}