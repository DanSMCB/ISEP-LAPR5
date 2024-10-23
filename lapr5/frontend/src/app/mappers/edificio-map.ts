import {Edificio} from "../models/edificio";
import {EdificioDTO} from "../DTO/edificio-dto";

export class EdificioMap {

  public static toDTO(edificio: Edificio): EdificioDTO {
    return {
      codigo: edificio.codigo,
      nome: edificio.nome,
      descricao: edificio.descricao,
      pisoMaxSize: edificio.pisoMaxSize
    } as EdificioDTO;
  }

  public static toViewModel(edificioDTO: EdificioDTO): Edificio {
    return {
      codigo: edificioDTO.codigo,
      nome: edificioDTO.nome,
      descricao: edificioDTO.descricao,
      pisoMaxSize: edificioDTO.pisoMaxSize
    } as Edificio;
  }

  public static toViewModelList(edificioDTOList: EdificioDTO[]): Edificio[] {
    var listEdificio: Edificio[];
    listEdificio=[];
    edificioDTOList.forEach(element => {
      listEdificio.push(EdificioMap.toViewModel(element))
    });

    return listEdificio;
  }
}
