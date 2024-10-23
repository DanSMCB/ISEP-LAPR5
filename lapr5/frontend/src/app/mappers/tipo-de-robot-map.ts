import {TipoDeRobot} from "../models/tipo-de-robot";
import {TipoDeRobotDTO} from "../DTO/tipo-de-robot-dto";

export class TipoDeRobotMap {

  public static toDTO(tipoDeRobot: TipoDeRobot): TipoDeRobotDTO {
    return {
      descricao: tipoDeRobot.descricao,
      tarefas: tipoDeRobot.tarefas
    } as TipoDeRobotDTO;
  }

  public static toViewModel(tipoDeRobotDTO: TipoDeRobotDTO): TipoDeRobot {
    return {
        descricao: tipoDeRobotDTO.descricao,
        tarefas: tipoDeRobotDTO.tarefas
    } as TipoDeRobot;
  }

  public static toViewModelList( tipoDeRobotDTOList: TipoDeRobotDTO[]): TipoDeRobot[] {
    var listTipoDeRobot: TipoDeRobot[];
    listTipoDeRobot=[];
    tipoDeRobotDTOList.forEach(element => {
      listTipoDeRobot.push(TipoDeRobotMap.toViewModel(element))
    });

    return listTipoDeRobot;
  }
}
