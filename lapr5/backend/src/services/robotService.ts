import { Service, Inject } from 'typedi';
import config from "../../config";
import IRobotDTO from '../dto/IRobotDTO';
import { Robot } from "../domain/robot";
import IRobotRepo from '../services/IRepos/IRobotRepo';
import IRobotService from './IServices/IRobotService';
import { Result } from "../core/logic/Result";
import { RobotMap } from "../mappers/RobotMap";
import { RobotId } from '../domain/robotId';

@Service()
export default class RobotService implements IRobotService {
  constructor(
      @Inject(config.repos.robot.name) private robotRepo : IRobotRepo
  ) {}

  public async getRobot(numeroSerie: string): Promise<Result<IRobotDTO>> {
    try {
      const robot = await this.robotRepo.findByCodigo(numeroSerie);

      if (robot === null) {
        return Result.fail<IRobotDTO>("Robot not found");
      }
      else {
        const robotDTOResult = RobotMap.toDTO( robot ) as IRobotDTO;
        return Result.ok<IRobotDTO>( robotDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getAllRobot(): Promise<Result<IRobotDTO[]>> {
    try {
      const listRobotRecord = await this.robotRepo.getAll(); 

      if (!listRobotRecord || listRobotRecord.length === 0) {
        return Result.fail<IRobotDTO[]>("Robot not found");
      }
  
      const listRobot: IRobotDTO[] = listRobotRecord
        .filter((robot) => robot.codigo != null)
        .map((robot) => RobotMap.toDTO(robot) as IRobotDTO);
  
      return Result.ok<IRobotDTO[]>(listRobot);
    } catch (e) {
      throw e; 
    }
  }

  public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {
      // Validação do estado do robot
      const estadosValidos = ["desinibido", "inibido"];
      const estado = robotDTO.estado;
      if (!estadosValidos.includes(estado)) {
        return Result.fail<IRobotDTO>("Estado de robot inválido");
        
      }

      // Validação do tipo de robot
      const validRobotTypes = ["robisep", "droneisep"];
      const tipoRobot = robotDTO.tipoDeRobot;
      if (!validRobotTypes.includes(tipoRobot)) {
        return Result.fail<IRobotDTO>("Tipo de robot inválido");
      }

      const robotOrError = await Robot.create(robotDTO);

      if (robotOrError.isFailure) {
        return Result.fail<IRobotDTO>(robotOrError.errorValue());
      }

      const robotResult = robotOrError.getValue();

      await this.robotRepo.save(robotResult);

      const robotDTOResult = RobotMap.toDTO(robotResult) as IRobotDTO;
      return Result.ok<IRobotDTO>(robotDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {
      // Validação do estado do robot
      const estadosValidos = ["desinibido", "inibido"];
      const estado = robotDTO.estado;
      if (!estadosValidos.includes(estado)) {
        return Result.fail<IRobotDTO>("Estado de robot inválido");
        
      }

      // Validação do tipo de robot
      const validRobotTypes = ["robisep", "droneisep"];
      const tipoRobot = robotDTO.tipoDeRobot;
      if (!validRobotTypes.includes(tipoRobot)) {
        return Result.fail<IRobotDTO>("Tipo de robot inválido");
      }

      const robot = await this.robotRepo.findByCodigo(robotDTO.codigo);

      if (robot === null) {
        return Result.fail<IRobotDTO>("Robot not found");
      } else {
        robot.numeroSerie = robotDTO.numeroSerie;
        robot.codigo = robotDTO.codigo;
        robot.nickname = robotDTO.nickname;
        robot.marca = robotDTO.marca;
        robot.estado = robotDTO.estado;
        robot.tipoDeRobot = robotDTO.tipoDeRobot;
        await this.robotRepo.save(robot);

        const robotDTOResult = RobotMap.toDTO(robot) as IRobotDTO;
        return Result.ok<IRobotDTO>(robotDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async inhibitRobot(numeroSerie: string ): Promise<Result<IRobotDTO>> {
    try {
      const robot = await this.robotRepo.findByCodigo(numeroSerie);
      
      const estadosValidos = ["desinibido", "inibido"];
      const estado = robot.estado;
      
      if (robot === null) {
        return Result.fail<IRobotDTO>("Robot not found");
      }

      if (robot.estado === "inibido") {
        console.log("Robot nº",numeroSerie," is already inhibited.")
        return Result.fail<IRobotDTO>("Robot is already inhibited");
      }

      if (!estadosValidos.includes(estado)){
        console.log("Robot nº",numeroSerie,"is in an invalid state for inhibition.")
        return Result.fail<IRobotDTO>("Robot is in an invalid state for inhibition");
      }

      // Define o estado do robot como "inibido"
      robot.estado = "inibido";

      // Salva a atualização do robot no repositório
      await this.robotRepo.save(robot);
      console.log("Robot nº",numeroSerie,"inhibited with success.")
      return Result.ok<IRobotDTO>();
    } catch (e) {
      // Adicione tratamento de erro aqui, como logs
      throw e;
    }
  }
}
