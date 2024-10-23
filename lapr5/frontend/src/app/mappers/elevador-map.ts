import {Elevador} from "../models/elevador";
import {ElevadorDTO} from "../DTO/elevador-dto";

export class ElevadorMap {

  public static toDTO(elevador: Elevador): ElevadorDTO {
    return {
      codigo: elevador.codigo,
      edificio: elevador.edificio,
      pisos: elevador.pisos
    } as ElevadorDTO;
  }

  public static toViewModel(elevadorDTO: ElevadorDTO): Elevador {
    return {
        codigo: elevadorDTO.codigo,
        edificio: elevadorDTO.edificio,
        pisos: elevadorDTO.pisos
    } as Elevador;
  }

  public static toViewModelList( elevadorDTOList: ElevadorDTO[]): Elevador[] {
    var listElevador: Elevador[];
    listElevador=[];
    elevadorDTOList.forEach(element => {
      listElevador.push(ElevadorMap.toViewModel(element))
    });

    return listElevador;
  }
}
