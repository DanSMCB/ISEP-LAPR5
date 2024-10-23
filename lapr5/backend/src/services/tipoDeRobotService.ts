import { Service, Inject } from 'typedi';
import config from "../../config";

import { TipoDeRobot } from "../domain/tipoDeRobot";
import ITipoDeRobotRepo from '../services/IRepos/ITipoDeRobotRepo';
import ITipoDeRobotService from './IServices/ITipoDeRobotService';
import { Result } from "../core/logic/Result";
import { TipoDeRobotMap } from "../mappers/TipoDeRobotMap";
import ITipoDeRobotDTO from '../dto/ITipoDeRobotDTO';

@Service()
export default class TipoDeRobotService implements ITipoDeRobotService {
  constructor(
      @Inject(config.repos.tipoDeRobot.name) private tipoDeRobotRepo : ITipoDeRobotRepo
  ) {}

  public async getTipoDeRobot( tipoDeRobotId: string ): Promise<Result<ITipoDeRobotDTO>> {
    try {
      const tipoDeRobot = await this.tipoDeRobotRepo.findByDomainId(tipoDeRobotId);

      if (tipoDeRobot === null) {
        return Result.fail<ITipoDeRobotDTO>("TipoDeRobot not found");
      }
      else {
        const tipoDeRobotDTOResult = TipoDeRobotMap.toDTO( tipoDeRobot ) as ITipoDeRobotDTO;
        return Result.ok<ITipoDeRobotDTO>( tipoDeRobotDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async createTipoDeRobot(tipoDeRobotDTO: ITipoDeRobotDTO): Promise<Result<ITipoDeRobotDTO>> {
    try {

      const tipoDeRobotOrError = await TipoDeRobot.create( tipoDeRobotDTO );

      if (tipoDeRobotOrError.isFailure) {
        return Result.fail<ITipoDeRobotDTO>(tipoDeRobotOrError.errorValue());
      }

      const tipoDeRobotResult = tipoDeRobotOrError.getValue();

      await this.tipoDeRobotRepo.create(tipoDeRobotResult);

      const tipoDeRobotDTOResult = TipoDeRobotMap.toDTO( tipoDeRobotResult ) as ITipoDeRobotDTO;
      return Result.ok<ITipoDeRobotDTO>( tipoDeRobotDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateTipoDeRobot(tipoDeRobotDTO: ITipoDeRobotDTO, tipoDeRobotId: string): Promise<Result<ITipoDeRobotDTO>> {
    try {
      const tipoDeRobot = await this.tipoDeRobotRepo.findByDomainId(tipoDeRobotId);

      if (tipoDeRobot === null) {
        return Result.fail<ITipoDeRobotDTO>("TipoDeRobot not found");
      }
      else {
        tipoDeRobot.descricao = tipoDeRobotDTO.descricao;
        await this.tipoDeRobotRepo.save(tipoDeRobot);

        const tipoDeRobotDTOResult = TipoDeRobotMap.toDTO( tipoDeRobot ) as ITipoDeRobotDTO;
        return Result.ok<ITipoDeRobotDTO>( tipoDeRobotDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getAllTipoDeRobot(): Promise<Result<ITipoDeRobotDTO[]>> {
    try {
      const listTipoDeRobotRecord = await this.tipoDeRobotRepo.getAll();

      if(listTipoDeRobotRecord == null){
        return Result.fail<ITipoDeRobotDTO[]>("TipoDeRobot not found");
      } else {
        var listTipoDeRobot:ITipoDeRobotDTO[];
        listTipoDeRobot=[];

        listTipoDeRobotRecord.forEach(function(tipoDeRobot){
          const tipoDeRobotDTOResult = TipoDeRobotMap.toDTO(tipoDeRobot) as ITipoDeRobotDTO;
          listTipoDeRobot.push(tipoDeRobotDTOResult);
        })

        return Result.ok<ITipoDeRobotDTO[]>(listTipoDeRobot);
      }  
    } catch(e){
      throw e;
    }
  }
}