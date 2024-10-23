import { Service, Inject } from "typedi";
import config from "../../config";

import { Passagem } from "../domain/passagem";
import IPassagemRepo from "../services/IRepos/IPassagemRepo";
import IPassagemService from "./IServices/IPassagemService";
import { Result } from "../core/logic/Result";
import { PassagemMap } from "../mappers/PassagemMap";
import IPassagemDTO from "../dto/IPassagemDTO";

import IPisoRepo from "./IRepos/IPisoRepo";

@Service()
export default class PassagemService implements IPassagemService {
  constructor(
    @Inject(config.repos.passagem.name) private passagemRepo: IPassagemRepo,
    @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo
  ) {}

  public async createPassagem(
    passagemDTO: IPassagemDTO
  ): Promise<Result<IPassagemDTO>> {
    try {
      const listPisoRecord = await this.pisoRepo.getAll();
      const listPassagemRecord = await this.passagemRepo.getAll();
      //CHECK IF PASSAGEM ALREADY EXISTS
      listPassagemRecord.forEach(passagem => {
      
        let alreadyExists = false;
        if((passagem.props.connection[0].edificio == passagemDTO.connection[0].edificio 
          && passagem.props.connection[0].piso == passagemDTO.connection[0].piso ) &&
          (passagem.props.connection[1].edificio == passagemDTO.connection[1].edificio 
            && passagem.props.connection[1].piso == passagemDTO.connection[1].piso )){
          alreadyExists = true;
        }
        if((passagem.props.connection[0].edificio == passagemDTO.connection[1].edificio 
          && passagem.props.connection[0].piso == passagemDTO.connection[1].piso ) &&
          (passagem.props.connection[1].edificio == passagemDTO.connection[0].edificio 
            && passagem.props.connection[1].piso == passagemDTO.connection[0].piso )){
          alreadyExists = true;
        }
        if(alreadyExists == true){
          throw new Error("This Passagem already exists");
        }
      })
      let piso1Exists = false;
      let piso2Exists = false;
      //CHECK IF PISOS PROVIDED EXISTS
      listPisoRecord.forEach(piso => {
        
        if(String(piso.piso) == passagemDTO.connection[0].piso && piso.edificio == passagemDTO.connection[0].edificio){
          piso1Exists = true;
        }
        if(String(piso.piso) == passagemDTO.connection[1].piso && piso.edificio == passagemDTO.connection[1].edificio){
          piso2Exists = true;
        }
      });
      
      if((piso1Exists && piso2Exists) == false){
        throw new Error("The Pisos must exist");
      } 

      const passagemOrError = await Passagem.create(passagemDTO);
      
      if (passagemOrError.isFailure) {
        return Result.fail<IPassagemDTO>(passagemOrError.errorValue());
      }

      const passagemResult = passagemOrError.getValue();
      
      await this.passagemRepo.save(passagemResult);
      
      const passagemDTOResult = PassagemMap.toDTO(
        passagemResult
      ) as IPassagemDTO;
      return Result.ok<IPassagemDTO>(passagemDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updatePassagem(
    passagemDTO: IPassagemDTO
  ): Promise<Result<IPassagemDTO>> {
    try {
      const passagem = await this.passagemRepo.findById(passagemDTO.passagemId);

      if (passagem === null) {
        return Result.fail<IPassagemDTO>("Passagem not found");
      } else {
        passagem.passagemId = passagemDTO.passagemId;
        passagem.connection = passagemDTO.connection;

        await this.passagemRepo.save(passagem);

        const passagemDTOResult = PassagemMap.toDTO(passagem) as IPassagemDTO;
        return Result.ok<IPassagemDTO>(passagemDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getPassagemBetweenEdificios(
    edificio1: string, edificio2: string
  ): Promise<Result<IPassagemDTO[]>> {
    try {
      const listPassagemRecord = await this.passagemRepo.getAll();
      if (listPassagemRecord == null) {
        return Result.fail<IPassagemDTO[]>("Passagem not found");
      }

      const passagensWithConnection: IPassagemDTO[] = [];
      

      for (const passagem of listPassagemRecord) {
        let hasEdificio1 = false;
        let hasEdificio2 = false;

        
        if(passagem.props.connection[0].edificio == edificio1 || passagem.props.connection[1].edificio == edificio1){
          hasEdificio1 = true;
        }

        if(passagem.props.connection[0].edificio == edificio2 || passagem.props.connection[1].edificio == edificio2){
          hasEdificio2 = true;
        }
  
        if (hasEdificio1 && hasEdificio2) {
          const passagemDTO = PassagemMap.toDTO(passagem) as IPassagemDTO;
          passagensWithConnection.push(passagemDTO);
        }
      }

      return Result.ok<IPassagemDTO[]>(passagensWithConnection);
    } catch (e) {
      throw e;
    }
  }
}
