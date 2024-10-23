import { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi";
import config from "../../config";

import IPassagemController from "./IControllers/IPassagemController";
import IPassagemService from "../services/IServices/IPassagemService";
import IPassagemDTO from "../dto/IPassagemDTO";

import { Result } from "../core/logic/Result";

@Service()
export default class PassagemController
  implements
    IPassagemController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.passagem.name)
    private passagemServiceInstance: IPassagemService
  ) {}

  public async createPassagem(req: Request, res: Response, next: NextFunction) {
    try {
      const passagemOrError = (await this.passagemServiceInstance.createPassagem(
        req.body as IPassagemDTO
      )) as Result<IPassagemDTO>;
      
      if (passagemOrError.isFailure) {
        return res.status(402).send();
      }

      const passagemDTO = passagemOrError.getValue();
      
      return res.json(passagemDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async updatePassagem(req: Request, res: Response, next: NextFunction) {
    try {
      const passagemOrError = (await this.passagemServiceInstance.updatePassagem(
        req.body as IPassagemDTO
      )) as Result<IPassagemDTO>;

      if (passagemOrError.isFailure) {
        return res.status(404).send();
      }

      const passagemDTO = passagemOrError.getValue();
      return res.status(201).json(passagemDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async listPassagemBetweenEdificios(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const edificio1 = req.params.edificio1;
       const edificio2 = req.params.edificio2;
      const passagemOrError = (await this.passagemServiceInstance.getPassagemBetweenEdificios(
        edificio1, 
      edificio2
      )) as Result<IPassagemDTO[]>;

      if (passagemOrError.isFailure) {
        return res.status(404).send();
      }

      const passagemDTOArray = passagemOrError.getValue();

      return res.status(201).json(passagemDTOArray);
    } catch (e) {
      return next(e);
    }
  }
}
