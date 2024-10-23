import {Tarefa} from "../models/tarefa";
import {TarefaDTO} from "../DTO/tarefa-dto";

export class TarefaMap {

  public static toDTO(tarefa: Tarefa): TarefaDTO {
    return {
      codigo: tarefa.codigo,
      descricao: tarefa.descricao,
      robot: tarefa.robot,
      tipoDeRobot: tarefa.tipoDeRobot,
      estado: tarefa.estado,
      contactoRequisitante: tarefa.contactoRequisitante,
      tipoDeTarefa: tarefa.tipoDeTarefa,

      // No caso de se tratar de uma tarefa do tipo: vigilancia
      contactoIncidente: tarefa.contactoIncidente,
      edificio: tarefa.edificio,
      pisos: tarefa.pisos,

      // No caso de se tratar de uma tarefa do tipo: entrega de objetos
      salaRecolha: tarefa.salaRecolha,
      salaEntrega: tarefa.salaEntrega,
      contactoRecolha: tarefa.contactoRecolha,
      contactoEntrega: tarefa.contactoEntrega
    } as TarefaDTO;
  }

  public static toViewModel(tarefaDTO: TarefaDTO): Tarefa {
    return {
        codigo: tarefaDTO.codigo,
        descricao: tarefaDTO.descricao,
        robot: tarefaDTO.robot,
        tipoDeRobot: tarefaDTO.tipoDeRobot,
        estado: tarefaDTO.estado,
        contactoRequisitante: tarefaDTO.contactoRequisitante,
        tipoDeTarefa: tarefaDTO.tipoDeTarefa,
  
        // No caso de se tratar de uma tarefa do tipo: vigilancia
        contactoIncidente: tarefaDTO.contactoIncidente,
        edificio: tarefaDTO.edificio,
        pisos: tarefaDTO.pisos,
  
        // No caso de se tratar de uma tarefa do tipo: entrega de objetos
        salaRecolha: tarefaDTO.salaRecolha,
        salaEntrega: tarefaDTO.salaEntrega,
        contactoRecolha: tarefaDTO.contactoRecolha,
        contactoEntrega: tarefaDTO.contactoEntrega
    } as Tarefa;
  }

  public static toViewModelList(tarefaDTOList: TarefaDTO[]): Tarefa[] {
    var listTarefa: Tarefa[];
    listTarefa=[];
    tarefaDTOList.forEach(element => {
      listTarefa.push(TarefaMap.toViewModel(element))
    });

    return listTarefa;
  }
}
