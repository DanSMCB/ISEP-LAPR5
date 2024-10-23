import {Robot} from "../models/robot";
import {RobotDTO} from "../DTO/robot-dto";

export class RobotMap {

  public static toDTO(robot: Robot): RobotDTO {
    return {
      numeroSerie: robot.numeroSerie,
      codigo: robot.codigo,
      nickname: robot.nickname,
      marca: robot.marca,
      estado: robot.estado,
      tipoDeRobot: robot.tipoDeRobot
    } as RobotDTO;
  }

  public static toViewModel(robotDTO: RobotDTO): Robot {
    return {
        numeroSerie: robotDTO.numeroSerie,
        codigo: robotDTO.codigo,
        nickname: robotDTO.nickname,
        marca: robotDTO.marca,
        estado: robotDTO.estado,
        tipoDeRobot: robotDTO.tipoDeRobot
    } as Robot;
  }

  public static toViewModelList( robotDTOList: RobotDTO[]): Robot[] {
    var listRobot: Robot[];
    listRobot=[];
    robotDTOList.forEach(element => {
      listRobot.push(RobotMap.toViewModel(element))
    });

    return listRobot;
  }
}
