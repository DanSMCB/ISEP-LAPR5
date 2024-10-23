import { Service, Inject } from 'typedi';
import config from "../../config";

import { Sala } from "../domain/sala";
import ISalaRepo from '../services/IRepos/ISalaRepo';
import IPisoRepo from '../services/IRepos/IPisoRepo';
import ISalaService from './IServices/ISalaService';
import { Result } from "../core/logic/Result";
import { SalaMap } from "../mappers/SalaMap";
import ISalaDTO from '../dto/ISalaDTO';

@Service()
export default class SalaService implements ISalaService {
  constructor(
      @Inject(config.repos.sala.name) private salaRepo : ISalaRepo,
      @Inject(config.repos.piso.name) private pisoRepo : IPisoRepo
  ) {}

  public async getSala( salaId: string): Promise<Result<ISalaDTO>> {
    try {
      const sala = await this.salaRepo.findByDomainId(salaId);

      if (sala === null) {
        return Result.fail<ISalaDTO>("Sala not found");
      }
      else {
        const salaDTOResult = SalaMap.toDTO( sala ) as ISalaDTO;
        return Result.ok<ISalaDTO>( salaDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async createSala(salaDTO: ISalaDTO): Promise<Result<ISalaDTO>> {
    try {
      const salaOrError = await Sala.create(salaDTO);

      if (salaOrError.isFailure) {
        return Result.fail<ISalaDTO>(salaOrError.errorValue());
      }

      const salaResult = salaOrError.getValue();

      const piso = await this.pisoRepo.findByEdificioAndPiso(salaDTO.edificio, salaDTO.piso);

      if (piso === null) {
        return Result.fail<ISalaDTO>("Piso not found");
      }

      const sala = await this.salaRepo.findByDomainId(salaDTO.nome);
      
      if (sala === null) {
        await this.salaRepo.create(salaResult);

        const salaDTOResult = SalaMap.toDTO(salaResult) as ISalaDTO;
        return Result.ok<ISalaDTO>(salaDTOResult);
      } else {
        return Result.fail<ISalaDTO>("Sala already exists");
      }
    } catch (e) {
      throw e;
    }
  }

  public async updateSala(salaDTO: ISalaDTO): Promise<Result<ISalaDTO>> {
    try {
      const sala = await this.salaRepo.findByDomainId(salaDTO.nome);

      if (sala === null) {
        return Result.fail<ISalaDTO>("Sala not found");
      }
      else {
        sala.nome = salaDTO.nome;
        sala.descricao = salaDTO.descricao;
        sala.tamanho = salaDTO.tamanho;
        sala.categoria = salaDTO.categoria;
        sala.edificio = salaDTO.edificio;
        sala.piso = salaDTO.piso;
        await this.salaRepo.save(sala);

        const salaDTOResult = SalaMap.toDTO( sala ) as ISalaDTO;
        return Result.ok<ISalaDTO>( salaDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getAllSala(): Promise<Result<ISalaDTO[]>> {
    try {
      const listSalaRecord = await this.salaRepo.getAll();
  
      if (!listSalaRecord || listSalaRecord.length === 0) {
        return Result.fail<ISalaDTO[]>("Sala not found");
      }
  
      const listSala: ISalaDTO[] = listSalaRecord
        .filter((sala) => sala.nome != null)
        .map((sala) => SalaMap.toDTO(sala) as ISalaDTO);
  
      return Result.ok<ISalaDTO[]>(listSala);
    } catch (e) {
      throw e; // Considere lidar com exceções de forma apropriada
    }
  }
}