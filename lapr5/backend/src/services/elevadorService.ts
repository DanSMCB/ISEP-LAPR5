import { Service, Inject } from 'typedi';
import config from "../../config";

import IElevadorDTO from '../dto/IElevadorDTO';
import { Elevador } from "../domain/elevador";
import IElevadorRepo from '../services/IRepos/IElevadorRepo';
import IEdificioRepo from '../services/IRepos/IEdificioRepo';
import IPisoRepo from '../services/IRepos/IPisoRepo';
import IElevadorService from './IServices/IElevadorService';
import { Result } from "../core/logic/Result";
import { ElevadorMap } from "../mappers/ElevadorMap";

@Service()
export default class ElevadorService implements IElevadorService {
  constructor(
      @Inject(config.repos.elevador.name) private elevadorRepo : IElevadorRepo,
      @Inject(config.repos.edificio.name) private edificioRepo : IEdificioRepo,
      @Inject(config.repos.piso.name) private pisoRepo : IPisoRepo
  ) {}

  public async getElevador( elevadorId: string ): Promise<Result<IElevadorDTO>> {
    try {
      const elevador = await this.elevadorRepo.findByCodigo(elevadorId);

      if (elevador === null) {
        return Result.fail<IElevadorDTO>("Elevador not found");
      }
      else {
        const elevadorDTOResult = ElevadorMap.toDTO( elevador ) as IElevadorDTO;
        return Result.ok<IElevadorDTO>( elevadorDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async createElevador(elevadorDTO: IElevadorDTO): Promise<Result<IElevadorDTO>> {
    try {
      const elevadorOrError = await Elevador.create(elevadorDTO);

      if (elevadorOrError.isFailure) {
        return Result.fail<IElevadorDTO>(elevadorOrError.errorValue());
      }

      const elevadorResult = elevadorOrError.getValue();

      const edificio = await this.edificioRepo.findByCodigo(elevadorDTO.edificio);

      if (edificio === null) {
        return Result.fail<IElevadorDTO>("Edificio not found");
      }

      const listPisos = elevadorResult.pisos;
      for (const piso of listPisos) {
        const pisoRecord = await this.pisoRepo.findByEdificioAndPiso(elevadorDTO.edificio, piso.piso);
        
        if(pisoRecord === null) {
          return Result.fail<IElevadorDTO>('Piso not found');
        }
      }

      const elevador = await this.elevadorRepo.findByCodigo(elevadorDTO.codigo);
      
      if (elevador === null) {
        await this.elevadorRepo.create(elevadorResult);

        const elevadorDTOResult = ElevadorMap.toDTO(elevadorResult) as IElevadorDTO;

        return Result.ok<IElevadorDTO>(elevadorDTOResult);
      } else {
        return Result.fail<IElevadorDTO>("Elevador already exists");
      }
    } catch (e) {
      throw e;
    }
  }

  public async updateElevador(elevadorDTO: IElevadorDTO): Promise<Result<IElevadorDTO>> {
    try {
      const elevador = await this.elevadorRepo.findByCodigo(elevadorDTO.codigo);

      if (elevador === null) {
        return Result.fail<IElevadorDTO>("Elevador not found");
      }
      else {
        elevador.codigo = elevadorDTO.codigo;
        elevador.edificio = elevadorDTO.edificio;
        elevador.pisos = elevadorDTO.pisos;
        await this.elevadorRepo.save(elevador);

        const elevadorDTOResult = ElevadorMap.toDTO( elevador ) as IElevadorDTO;
        return Result.ok<IElevadorDTO>( elevadorDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getAllElevadoresByEdificio(edificio: string): Promise<Result<IElevadorDTO[]>> {
    try {
      const listElevadoresRecord = await this.elevadorRepo.getAllElevadoresByEdificio(edificio);

      if (!listElevadoresRecord || listElevadoresRecord.length === 0) {
        return Result.fail<IElevadorDTO[]>('Elevador not found');
      }

      const listElevador: IElevadorDTO[] = listElevadoresRecord
        .filter(elevador => elevador.id != null)
        .map(elevador => ElevadorMap.toDTO(elevador) as IElevadorDTO);

      return Result.ok<IElevadorDTO[]>(listElevador);
    } catch (e) {
      throw e;
    }
  }
}