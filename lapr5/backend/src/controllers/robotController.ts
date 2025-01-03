import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRobotController from "./IControllers/IRobotController";
import IRobotService from '../services/IServices/IRobotService';
import IRobotDTO from '../dto/IRobotDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RobotController implements IRobotController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.robot.name) private robotServiceInstance : IRobotService
  ) {}

  public async createRobot(req: Request, res: Response, next: NextFunction) {
    try { 
      const robotOrError = await this.robotServiceInstance.createRobot(req.body as IRobotDTO) as Result<IRobotDTO>;

      if (robotOrError.isFailure) {
          return res.status(402).send();
      }
      
      const robotDTO = robotOrError.getValue();
      return res.json( robotDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = await this.robotServiceInstance.updateRobot(req.body as IRobotDTO) as Result<IRobotDTO>;

      if (robotOrError.isFailure) {
          return res.status(404).send();
      }
      
      const robotDTO = robotOrError.getValue();
      return res.status(201).json( robotDTO );
    }
    catch (e) {
        return next(e);
    }
  };

  public async getRobot(req: Request, res: Response, next: NextFunction) {  
    try {
      const robotOrError = await this.robotServiceInstance.getRobot(req.params.numeroSerie) as Result<IRobotDTO>;
            
      if (robotOrError.isFailure) {
          return res.status(404).send();
      }

      const robotDTOArray = robotOrError.getValue();
      
      return res.status(201).json( robotDTOArray );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAllRobot(req: Request, res: Response, next: NextFunction) {  
    try {
      const robotOrError = await this.robotServiceInstance.getAllRobot();
            
      if (robotOrError.isFailure) {
          return res.status(404).send();
      }

      const robotDTOArray = robotOrError.getValue();
      
      return res.status(201).json( robotDTOArray );
    }
    catch (e) {
      return next(e);
    }
  };

  public async inhibitRobot(req: Request, res: Response, next: NextFunction) {  
    try {
      const robotOrError = await this.robotServiceInstance.inhibitRobot(req.body.numeroSerie as string) as Result<IRobotDTO>;
      if (robotOrError.isFailure) {
        return res.status(400).send(); // Use 400 for client errors
      }

      return res.status(200).send(); // 200 for successful inhibition
    } catch (e) {
      return next(e);
    }
  };
}