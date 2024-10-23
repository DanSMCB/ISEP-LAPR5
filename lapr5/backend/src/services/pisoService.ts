import { Service, Inject } from 'typedi';
import config from '../../config';

import { Piso } from '../domain/piso';
import IPisoRepo from '../services/IRepos/IPisoRepo';
import IPisoService from './IServices/IPisoService';
import { Result } from '../core/logic/Result';
import { PisoMap } from '../mappers/PisoMap';
import IPisoDTO from '../dto/IPisoDTO';
import IPassagemRepo from './IRepos/IPassagemRepo';
import IEdificioRepo from './IRepos/IEdificioRepo';

@Service()
export default class PisoService implements IPisoService {
  constructor(
    @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo,
    @Inject(config.repos.edificio.name) private edificioRepo: IEdificioRepo,
    @Inject(config.repos.passagem.name) private passagemRepo: IPassagemRepo,
  ) {}

  public async createPiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>> {
    try {
      const pisoOrError = await Piso.create(pisoDTO);

      if (pisoOrError.isFailure) {
        return Result.fail<IPisoDTO>(pisoOrError.errorValue());
      }

      const pisoResult = pisoOrError.getValue();

      const edificio = await this.edificioRepo.findByCodigo(pisoDTO.edificio);

      if (edificio === null) {
        return Result.fail<IPisoDTO>("Edificio not found");
      }

      const piso = await this.pisoRepo.findByEdificioAndPiso(pisoDTO.edificio, pisoDTO.piso);
      
      if (piso === null) {
        await this.pisoRepo.create(pisoResult);

        const pisoDTOResult = PisoMap.toDTO(pisoResult) as IPisoDTO;
        
        return Result.ok<IPisoDTO>(pisoDTOResult);
      } else {
        return Result.fail<IPisoDTO>("Piso already exists");
      }
    } catch (e) {
      throw e;
    }
  }

  public async updatePiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>> {
    try {
      const piso = await this.pisoRepo.findByEdificioAndPiso(pisoDTO.edificio, pisoDTO.piso);
      
      if (piso === null) {
        return Result.fail<IPisoDTO>("Piso not found");
      } else {
        piso.edificio = pisoDTO.edificio;
        piso.piso = pisoDTO.piso;
        piso.descricao = pisoDTO.descricao;
        piso.passagens = pisoDTO.passagens;
        piso.salas = pisoDTO.salas;
        await this.pisoRepo.save(piso);

        const pisoDTOResult = PisoMap.toDTO(piso) as IPisoDTO;
        return Result.ok<IPisoDTO>(pisoDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAllPisosByEdificio(edificio: string): Promise<Result<IPisoDTO[]>> {
    try {
      const listPisosRecord = await this.pisoRepo.getAllPisosByEdificio(edificio);

      if (!listPisosRecord || listPisosRecord.length === 0) {
        return Result.fail<IPisoDTO[]>('Piso not found');
      }

      const listEdificio: IPisoDTO[] = listPisosRecord
        .filter(piso => piso.id != null)
        .map(piso => PisoMap.toDTO(piso) as IPisoDTO);

      return Result.ok<IPisoDTO[]>(listEdificio);
    } catch (e) {
      throw e;
    }
  }

  public async getPisosWithConnection(): Promise<Result<IPisoDTO[]>> {
    try {
      const listPassagemRecord = await this.passagemRepo.getAll();
      if (listPassagemRecord == null) {
        return Result.fail<IPisoDTO[]>('There are no Passagem');
      } else {
        let pisoDTOs: IPisoDTO[] = [];
  
        for (const passagem of listPassagemRecord) {
          for (const connection of passagem.props.connection) {
            const piso = connection.piso;
            const edificio = connection.edificio;
  
            const pisoRecord = await this.pisoRepo.findByEdificioAndPiso(edificio, piso);
  
            if (pisoRecord != null) {
              const pisoDTO = PisoMap.toDTO(pisoRecord);
              pisoDTOs.push(pisoDTO);
            }
          }
        }
  
        return Result.ok<IPisoDTO[]>(pisoDTOs);
      }
    } catch (e) {
      throw e;
    }
  }

  public async loadValidateFloor(json: string): Promise<Result<string>> {
    try {
      const parsedJSON = JSON.parse(json);
  
      if (
        parsedJSON.edificio &&
        parsedJSON.piso &&
        parsedJSON.descricao &&
        parsedJSON.passagens &&
        parsedJSON.salas
      ) {
        const edificio = parsedJSON.edificio;
        const piso = parsedJSON.piso;
  
        // Pesquise o piso com base no edifício e número do piso no JSON
        const pisoRecord = await this.pisoRepo.findByEdificioAndPiso(edificio, piso);
  
        if (pisoRecord) {
          // Atualize as propriedades do piso com os dados do JSON
          pisoRecord.descricao = parsedJSON.descricao;
          pisoRecord.passagens = parsedJSON.passagens.map(item => item.passagem);
          pisoRecord.salas = parsedJSON.salas.map(item => item.sala);
  
          // Salve o piso atualizado no repositório
          await this.pisoRepo.save(pisoRecord);
  
          console.log("JSON válido e piso atualizado com sucesso.");
          return Result.ok<string>('JSON válido e piso atualizado com sucesso.');
        } else {
          console.log("Piso não encontrado no repositório.");
          return Result.fail<string>('Piso não encontrado no repositório.');
        }
      } else {
        console.log("JSON inválido de acordo com os parâmetros definidos pelo projeto.");
        return Result.fail<string>('JSON inválido de acordo com os parâmetros definidos pelo projeto.');
      }
    } catch (error) {
      console.error('Erro ao analisar JSON:', error);
      return Result.fail<string>('Erro ao validar JSON: ' + error.message);
    }
  }
  
}
