import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ITipoDeRobotPersistence } from '../dataschema/ITipoDeRobotPersistence';

import { TipoDeRobot } from "../domain/tipoDeRobot";
import ITipoDeRobotDTO from "../dto/ITipoDeRobotDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class TipoDeRobotMap extends Mapper<TipoDeRobot> {
  
  public static toDTO(tipoDeRobot: TipoDeRobot): ITipoDeRobotDTO {
    return {
        id: tipoDeRobot.id.toString(),
        descricao: tipoDeRobot.descricao,
        tarefas: tipoDeRobot.tarefas
    } as ITipoDeRobotDTO;
  }

  public static toDomain (tipoDeRobot: any | Model<ITipoDeRobotPersistence & Document> ): TipoDeRobot {
    const tipoDeRobotOrError = TipoDeRobot.create(
      tipoDeRobot,
      new UniqueEntityID(tipoDeRobot.domainId)
    );

    tipoDeRobotOrError.isFailure ? console.log(tipoDeRobotOrError.error) : '';

    return tipoDeRobotOrError.isSuccess ? tipoDeRobotOrError.getValue() : null;
  }


  public static async toDomainList (tipoDeRobot: any | Model<ITipoDeRobotPersistence & Document> ): Promise<TipoDeRobot[]> {
    var listTipoDeRobot: TipoDeRobot[];
    listTipoDeRobot=[];
    tipoDeRobot.forEach(element => {
      const tipoDeRobotDTO: ITipoDeRobotDTO = {
        id: element.id.toString(),
        descricao: element.descricao,
        tarefas: element.tarefas
      };
      const tipoDeRobotOrError = TipoDeRobot.create(
        tipoDeRobotDTO,
        new UniqueEntityID(tipoDeRobotDTO.id)
    );
    tipoDeRobotOrError.isFailure ? console.log(tipoDeRobotOrError.error) : '';
    tipoDeRobotOrError.isSuccess ? listTipoDeRobot.push(tipoDeRobotOrError.getValue()):null;
    })

    return listTipoDeRobot;
  }

  public static toPersistence(tipoDeRobot: TipoDeRobot): any {
    return {
      domainId: tipoDeRobot.id.toString(),
      descricao: tipoDeRobot.descricao,
      tarefas: tipoDeRobot.tarefas
    };
  }
}
