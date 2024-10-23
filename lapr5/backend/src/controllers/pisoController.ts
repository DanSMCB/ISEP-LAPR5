import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IPisoController from './IControllers/IPisoController';
import IPisoService from '../services/IServices/IPisoService';
import IPisoDTO from '../dto/IPisoDTO';

import { Result } from '../core/logic/Result';

@Service()
export default class PisoController implements IPisoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.piso.name) private pisoServiceInstance: IPisoService
  ) {}

  public async createPiso(req: Request, res: Response, next: NextFunction) {
    try {
      const pisoOrError = (await this.pisoServiceInstance.createPiso(req.body as IPisoDTO)) as Result<IPisoDTO>;

      if (pisoOrError.isFailure) {
        return res.status(402).send();
      }

      const pisoDTO = pisoOrError.getValue();
      return res.json(pisoDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async updatePiso(req: Request, res: Response, next: NextFunction) {
    try {
      const pisoOrError = (await this.pisoServiceInstance.updatePiso(req.body as IPisoDTO) as Result<IPisoDTO>);

      if (pisoOrError.isFailure) {
        return res.status(404).send();
      }

      const pisoDTO = pisoOrError.getValue();
      return res.status(201).json(pisoDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllPisosByEdificio(req: Request, res: Response, next: NextFunction) {
    try {
      const pisoOrError = await this.pisoServiceInstance.getAllPisosByEdificio(req.params.edificio as string);

      if (pisoOrError.isFailure) {
        return res.status(404).send();
      }

      const pisoDTOArray = pisoOrError.getValue();

      return res.status(201).json(pisoDTOArray);
    } catch (e) {
      return next(e);
    }
  }

  public async loadValidateFloor(req: Request, res: Response, next: NextFunction) {
    try {
      // Access JSON data from the request body, not parameters
      //console.log(req.body);
      //console.log(JSON.stringify(req.body));
      const json = JSON.stringify(req.body); // crasha ao executar esta linha
      //console.log("a1");
      const validateOrError = (await this.pisoServiceInstance.loadValidateFloor(json)) as Result<string>;

      if (validateOrError.isFailure) {
        //console.log("a");
        return res.status(404).send();
      }

      const validoDTO = validateOrError.getValue();

      return res.status(201).json(validoDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getPisosWithConnection(req: Request, res: Response, next: NextFunction) {
    try {
      const pisoOrError = await this.pisoServiceInstance.getPisosWithConnection() as Result<IPisoDTO[]>;
      
      if (pisoOrError.isFailure) {
        return res.status(404).send();
      }

      const pisoDTOArray = pisoOrError.getValue();

      return res.status(201).json(pisoDTOArray);
    } catch (e) {
      return next(e);
    }
  }
}