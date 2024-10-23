import { Service, Inject } from 'typedi';
import config from '../../config';

import ITarefaDTO from '../dto/ITarefaDTO';
import { Tarefa } from '../domain/tarefa';
import ITarefaRepo from './IRepos/ITarefaRepo';
import ITarefaService from './IServices/ITarefaService';
import { Result } from '../core/logic/Result';
import { TarefaMap } from '../mappers/TarefaMap';

@Service()
export default class TarefaService implements ITarefaService {
  constructor(
      @Inject(config.repos.tarefa.name) private tarefaRepo: ITarefaRepo
  ) {}

  public async getTarefa(tarefaId: string): Promise<Result<ITarefaDTO>> {
    try {
      const tarefa = await this.tarefaRepo.findByCodigo(tarefaId);

      if (tarefa === null) {
        return Result.fail<ITarefaDTO>('Tarefa not found');
      } else {
        const tarefaDTOResult = TarefaMap.toDTO(tarefa) as ITarefaDTO;
        
        return Result.ok<ITarefaDTO>(tarefaDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createTarefa(tarefaDTO: ITarefaDTO): Promise<Result<ITarefaDTO>> {
    try {
      const tarefaOrError = await Tarefa.create(tarefaDTO);

      if (tarefaOrError.isFailure) {
        return Result.fail<ITarefaDTO>(tarefaOrError.errorValue());
      }

      const tarefaResult = tarefaOrError.getValue();

      await this.tarefaRepo.save(tarefaResult);

      const tarefaDTOResult = TarefaMap.toDTO(tarefaResult) as ITarefaDTO;
      console.log(tarefaDTOResult);
      return Result.ok<ITarefaDTO>(tarefaDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getAllTarefa(): Promise<Result<ITarefaDTO[]>> {
    try {
      const listTarefaRecord = await this.tarefaRepo.getAll();

      if (!listTarefaRecord || listTarefaRecord.length === 0) {
        return Result.fail<ITarefaDTO[]>('Tarefa not found');
      }

      const listTarefa: ITarefaDTO[] = listTarefaRecord
        .filter(tarefa => tarefa.codigo != null)
        .map(tarefa => TarefaMap.toDTO(tarefa) as ITarefaDTO);

      return Result.ok<ITarefaDTO[]>(listTarefa);
    } catch (e) {
      throw e;
    }
  }

  public async getAllTarefaNaoAprovada(): Promise<Result<ITarefaDTO[]>> {
    try {
      const listTarefaRecord = await this.tarefaRepo.getAll();

      if (!listTarefaRecord || listTarefaRecord.length === 0) {
        return Result.fail<ITarefaDTO[]>('Tarefa not found');
      }

      const listTarefa: ITarefaDTO[] = listTarefaRecord
        .filter(tarefa => tarefa.codigo != null && tarefa.estado === " ")
        .map(tarefa => TarefaMap.toDTO(tarefa) as ITarefaDTO);

      return Result.ok<ITarefaDTO[]>(listTarefa);
    } catch (e) {
      throw e;
    }
  }

  public async updateEstadoDaTarefa(codigo: string, estado: string): Promise<Result<ITarefaDTO>> {
    try {
      const tarefa = await this.tarefaRepo.findByCodigo(codigo);

      if (tarefa === null) {
        return Result.fail<ITarefaDTO>("Tarefa not found");
      }

      tarefa.estado = estado;

      await this.tarefaRepo.save(tarefa);
      return Result.ok<ITarefaDTO>();
    } catch (e) {
      throw e;
    }
  }
}