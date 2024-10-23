import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';

import IRobotDTO from "../dto/IRobotDTO";
import { Robot } from "../domain/robot";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { TipoDeRobot } from "../domain/tipoDeRobot";

export class RobotMap extends Mapper<Robot> {
  
  public static toDTO( robot: Robot): IRobotDTO {
    return {
      id: robot.id.toString(),
      numeroSerie : robot.numeroSerie,
      codigo : robot.codigo,
      nickname : robot.nickname,
      marca : robot.marca,
      estado : robot.estado,
      tipoDeRobot : robot.tipoDeRobot
    } as IRobotDTO;
  }

  public static toDomain (robot: any | Model<IRobotPersistence & Document> ): Robot {
    const robotOrError = Robot.create(
      robot,
      new UniqueEntityID(robot.domainId)
    );

    robotOrError.isFailure ? console.log(robotOrError.error) : '';

    return robotOrError.isSuccess ? robotOrError.getValue() : null;
  }

  public static async toDomainList (robot: any | Model<IRobotPersistence & Document> ): Promise<Robot[]> {
    var listRobot: Robot[];
    listRobot=[];
    robot.forEach(element => {
      const robotDTO: IRobotDTO = {
        id: element.id.toString(),
        numeroSerie: element.numeroSerie,
        codigo: element.codigo,
        nickname: element.nickname,
        marca: element.marca,
        estado: element.estado,
        tipoDeRobot : element.tipoDeRobot
      };
      const robotOrError = Robot.create(
        robotDTO,
        new UniqueEntityID(robotDTO.id)
    );
    robotOrError.isFailure ? console.log(robotOrError.error) : '';
    robotOrError.isSuccess ? listRobot.push(robotOrError.getValue()):null;
    })
    return listRobot;
  }

  public static toPersistence (robot: Robot): any {
    console.log(robot);
    return {
      domainId: robot.id.toString(),
      numeroSerie :robot.numeroSerie,
      codigo : robot.codigo,
      nickname : robot.nickname,
      marca : robot.marca,
      estado : robot.estado,
      tipoDeRobot : robot.tipoDeRobot
    }
  }
}