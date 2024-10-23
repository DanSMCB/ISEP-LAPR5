import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ITipoDeRobotController from "./IControllers/ITipoDeRobotController";
import ITipoDeRobotService from '../services/IServices/ITipoDeRobotService';
import ITipoDeRobotDTO from '../dto/ITipoDeRobotDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class TipoDeRobotController implements ITipoDeRobotController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.tipoDeRobot.name) private tipoDeRobotServiceInstance : ITipoDeRobotService
  ) {}

  public async createTipoDeRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const tipoDeRobotOrError = await this.tipoDeRobotServiceInstance.createTipoDeRobot(req.body as ITipoDeRobotDTO) as Result<ITipoDeRobotDTO>;
        
      if (tipoDeRobotOrError.isFailure) {
        return res.status(402).send();
      }

      const tipoDeRobotDTO = tipoDeRobotOrError.getValue();
      return res.json( tipoDeRobotDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateTipoDeRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const tipoDeRobotId = req.params.tipoDeRobotId;
  
      const tipoDeRobotOrError = await this.tipoDeRobotServiceInstance.updateTipoDeRobot(req.body, tipoDeRobotId) as Result<ITipoDeRobotDTO>;
  
      if (tipoDeRobotOrError.isFailure) {
        return res.status(404).send("TipoDeRobot not found");
      }
  
      const tipoDeRobotDTO = tipoDeRobotOrError.getValue();
      return res.status(201).json(tipoDeRobotDTO);
    } catch (e) {
      return next(e);
    }
  };

  public async getAllTipoDeRobot(req: Request, res: Response, next: NextFunction) {  
    try {
      const tipoDeRobotOrError = await this.tipoDeRobotServiceInstance.getAllTipoDeRobot() as Result<ITipoDeRobotDTO[]>;
            
      if (tipoDeRobotOrError.isFailure) {
          return res.status(404).send();
      }

      const tipoDeRobotDTOArray = tipoDeRobotOrError.getValue();
      
      return res.status(201).json( tipoDeRobotDTOArray );
    }
    catch (e) {
      return next(e);
    }
  };
}