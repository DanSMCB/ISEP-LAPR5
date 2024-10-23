import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ITarefaController from "./IControllers/ITarefaController";
import ITarefaService from '../services/IServices/ITarefaService';
import ITarefaDTO from '../dto/ITarefaDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class TarefaController implements ITarefaController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.tarefa.name) private tarefaServiceInstance : ITarefaService
  ) {}

  public async createTarefa(req: Request, res: Response, next: NextFunction) {
    try { 
      const tarefaOrError = await this.tarefaServiceInstance.createTarefa(req.body as ITarefaDTO) as Result<ITarefaDTO>;

      if (tarefaOrError.isFailure) {
          return res.status(402).send();
      }
      
      const tarefaDTO = tarefaOrError.getValue();
      return res.json( tarefaDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAllTarefa(req: Request, res: Response, next: NextFunction) {  
    try {
      const tarefaOrError = await this.tarefaServiceInstance.getAllTarefa();
            
      if (tarefaOrError.isFailure) {
          return res.status(404).send();
      }

      const tarefaDTOArray = tarefaOrError.getValue();
      
      return res.status(201).json( tarefaDTOArray );
    } catch (e) {
      return next(e);
    }
  };

  public async getAllTarefaNaoAprovada(req: Request, res: Response, next: NextFunction) {  
    try {
      const tarefaOrError = await this.tarefaServiceInstance.getAllTarefaNaoAprovada();
            
      if (tarefaOrError.isFailure) {
          return res.status(404).send();
      }

      const tarefaDTOArray = tarefaOrError.getValue();
      
      return res.status(201).json( tarefaDTOArray );
    } catch (e) {
      return next(e);
    }
  };

  public async updateEstadoDaTarefa(req: Request, res: Response, next: NextFunction) {  
    try {
      const tarefaOrError = await this.tarefaServiceInstance.updateEstadoDaTarefa(req.body.codigo as string, req.body.estado as string) as Result<ITarefaDTO>;
      if (tarefaOrError.isFailure) {
        return res.status(400).send(); // Use 400 for client errors
      }

      return res.status(200).send(); // 200 for successful inhibition
    } catch (e) {
      return next(e);
    }
  };
}