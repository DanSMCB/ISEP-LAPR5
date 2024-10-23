import {Sala} from "../models/sala";
import {SalaDTO} from "../DTO/sala-dto";

export class SalaMap {

  public static toDTO(sala: Sala): SalaDTO {
    return {
      nome: sala.nome,
      descricao: sala.descricao,
      categoria: sala.categoria,
      tamanho: sala.tamanho,
      edificio: sala.edificio,
      piso: sala.piso
    } as SalaDTO;
  }

  public static toViewModel(salaDTO: SalaDTO): Sala {
    return {
        nome: salaDTO.nome,
        descricao: salaDTO.descricao,
        categoria: salaDTO.categoria,
        tamanho: salaDTO.tamanho,
        edificio: salaDTO.edificio,
        piso: salaDTO.piso
    } as Sala;
  }

  public static toViewModelList( salaDTOList: SalaDTO[]): Sala[] {
    var listSala: Sala[];
    listSala=[];
    salaDTOList.forEach(element => {
      listSala.push(SalaMap.toViewModel(element))
    });

    return listSala;
  }
}
