import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ISalaController from "./IControllers/ISalaController";
import ISalaService from '../services/IServices/ISalaService';
import ISalaDTO from '../dto/ISalaDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class SalaController implements ISalaController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.sala.name) private salaServiceInstance : ISalaService
  ) {}

  public async createSala(req: Request, res: Response, next: NextFunction) {
    try {
      const salaOrError = await this.salaServiceInstance.createSala(req.body as ISalaDTO) as Result<ISalaDTO>;
        
      if (salaOrError.isFailure) {
        return res.status(402).send();
      }

      const salaDTO = salaOrError.getValue();
      return res.json( salaDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateSala(req: Request, res: Response, next: NextFunction) {
    try {
      const salaOrError = await this.salaServiceInstance.updateSala(req.body as ISalaDTO) as Result<ISalaDTO>;

      if (salaOrError.isFailure) {
        return res.status(404).send();
      }

      const salaDTO = salaOrError.getValue();
      return res.status(201).json( salaDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAllSala(req: Request, res: Response, next: NextFunction) {  
    try {
      const salaOrError = await this.salaServiceInstance.getAllSala();

      if (salaOrError.isFailure) {
          return res.status(404).send();
      }

      const salaDTOArray = salaOrError.getValue();
      
      return res.status(201).json( salaDTOArray );
    }
    catch (e) {
      return next(e);
    }
  };
}