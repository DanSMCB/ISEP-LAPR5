import { Service, Inject } from 'typedi';
import config from '../../config';

import IEdificioDTO from '../dto/IEdificioDTO';
import { Edificio } from '../domain/edificio';
import IEdificioRepo from './IRepos/IEdificioRepo';
import IPisoRepo from './IRepos/IPisoRepo';
import IEdificioService from './IServices/IEdificioService';
import { Result } from '../core/logic/Result';
import { EdificioMap } from '../mappers/EdificioMap';

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

@Service()
export default class EdificioService implements IEdificioService {
  constructor(
      @Inject(config.repos.edificio.name) private edificioRepo: IEdificioRepo,
      @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo
  ) {}

  public async getEdificio(edificioId: string): Promise<Result<IEdificioDTO>> {
    try {
      const edificio = await this.edificioRepo.findByCodigo(edificioId);

      if (edificio === null) {
        return Result.fail<IEdificioDTO>('Edificio not found');
      } else {
        const edificioDTOResult = EdificioMap.toDTO(edificio) as IEdificioDTO;
        
        return Result.ok<IEdificioDTO>(edificioDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>> {
    try {
      const edificioOrError = await Edificio.create(edificioDTO);

      if (edificioOrError.isFailure) {
        return Result.fail<IEdificioDTO>(edificioOrError.errorValue());
      }

      const edificioResult = edificioOrError.getValue();

      await this.edificioRepo.save(edificioResult);

      const edificioDTOResult = EdificioMap.toDTO(edificioResult) as IEdificioDTO;
      console.log(edificioDTOResult);
      return Result.ok<IEdificioDTO>(edificioDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>> {
    try {
      const edificio = await this.edificioRepo.findByCodigo(edificioDTO.codigo);

      if (edificio === null) {
        return Result.fail<IEdificioDTO>('Edificio not found');
      } else {
        edificio.nome = edificioDTO.nome;
        edificio.descricao = edificioDTO.descricao;
        edificio.pisoMaxSize = edificioDTO.pisoMaxSize;
        await this.edificioRepo.save(edificio);

        const edificioDTOResult = EdificioMap.toDTO(edificio) as IEdificioDTO;
        return Result.ok<IEdificioDTO>(edificioDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAllEdificio(): Promise<Result<IEdificioDTO[]>> {
    try {
      const listEdificioRecord = await this.edificioRepo.getAll();

      if (!listEdificioRecord || listEdificioRecord.length === 0) {
        return Result.fail<IEdificioDTO[]>('Edificio not found');
      }

      const listEdificio: IEdificioDTO[] = listEdificioRecord
        .filter(edificio => edificio.codigo != null)
        .map(edificio => EdificioMap.toDTO(edificio) as IEdificioDTO);

      return Result.ok<IEdificioDTO[]>(listEdificio);
    } catch (e) {
      throw e;
    }
  }

  public async getAllEdificioMinMaxPiso(min: number, max: number): Promise<Result<IEdificioDTO[]>> {
    try {
      const listEdificioRecord = await this.edificioRepo.getAll();

      if (!listEdificioRecord || listEdificioRecord.length === 0) {
        return Result.fail<IEdificioDTO[]>('Edificio not found');
      }

      var listEdificios: Edificio[];
      listEdificios=[];

      for (const edificio of listEdificioRecord) {
        const listPisos = await this.pisoRepo.getAllPisosByEdificio(edificio.codigo);

        if (listPisos.length >= min && listPisos.length <= max) {
          const edificioDTO: IEdificioDTO = {
            id: edificio.id.toString(),
            codigo: edificio.codigo,
            nome: edificio.nome,
            descricao: edificio.descricao,
            pisoMaxSize: edificio.pisoMaxSize,
          };
          const edificioOrError = Edificio.create(
            edificioDTO,
            new UniqueEntityID(edificioDTO.id)
          );
          edificioOrError.isFailure ? console.log(edificioOrError.error) : '';
          edificioOrError.isSuccess ? listEdificios.push(edificioOrError.getValue()):null;
        }
      }

      const listEdificio: IEdificioDTO[] = listEdificios
        .filter(edificio => edificio.codigo != null)
        .map(edificio => EdificioMap.toDTO(edificio) as IEdificioDTO);

      return Result.ok<IEdificioDTO[]>(listEdificio);
    } catch (e) {
      throw e;
    }
  }
}