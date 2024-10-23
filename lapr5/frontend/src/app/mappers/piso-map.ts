import {Piso} from "../models/piso";
import {PisoDTO} from "../DTO/piso-dto";

export class PisoMap {

  public static toDTO(piso: Piso): PisoDTO {
    return {
      edificio: piso.edificio,
      piso: piso.piso,
      descricao: piso.descricao,
      passagens: piso.passagens,
      salas: piso.salas
    } as PisoDTO;
  }

  public static toViewModel(pisoDTO: PisoDTO): Piso {
    return {
        edificio: pisoDTO.edificio,
        piso: pisoDTO.piso,
        descricao: pisoDTO.descricao,
        passagens: pisoDTO.passagens,
        salas: pisoDTO.salas
    } as Piso;
  }

  public static toViewModelList( pisoDTOList: PisoDTO[]): Piso[] {
    var listPiso: Piso[];
    listPiso=[];
    pisoDTOList.forEach(element => {
      listPiso.push(PisoMap.toViewModel(element))
    });

    return listPiso;
  }
}
