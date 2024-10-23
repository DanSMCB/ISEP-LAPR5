import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ITarefaPersistence } from '../dataschema/ITarefaPersistence';

import ITarefaDTO from "../dto/ITarefaDTO";
import { Tarefa } from "../domain/tarefa";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class TarefaMap extends Mapper<Tarefa> {
  
  public static toDTO(tarefa: Tarefa): ITarefaDTO {
    return {
        id: tarefa.id.toString(),
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
    } as ITarefaDTO;
  }

  public static toDomain (tarefa: any | Model<ITarefaPersistence & Document> ): Tarefa {
    const tarefaOrError = Tarefa.create(
      tarefa,
      new UniqueEntityID(tarefa.domainId)
    );

    tarefaOrError.isFailure ? console.log(tarefaOrError.error) : '';

    return tarefaOrError.isSuccess ? tarefaOrError.getValue() : null;
  }

  public static async toDomainList (tarefa: any | Model<ITarefaPersistence & Document> ): Promise<Tarefa[]> {
    var listTarefa: Tarefa[];
    listTarefa=[];
    tarefa.forEach(element => {
      const tarefaDTO: ITarefaDTO = {
        id: element.id.toString(),
        codigo: element.codigo,
        descricao: element.descricao,
        robot: element.robot,
        tipoDeRobot: element.tipoDeRobot,
        estado: element.estado,
        contactoRequisitante: element.contactoRequisitante,
        tipoDeTarefa: element.tipoDeTarefa,

        // No caso de se tratar de uma tarefa do tipo: vigilancia
        contactoIncidente: element.contactoIncidente,
        edificio: element.edificio,
        pisos: element.pisos,

        // No caso de se tratar de uma tarefa do tipo: entrega de objetos
        salaRecolha: element.salaRecolha,
        salaEntrega: element.salaEntrega,
        contactoRecolha: element.contactoRecolha,
        contactoEntrega: element.contactoEntrega
      };
      const tarefaOrError = Tarefa.create(
        tarefaDTO,
        new UniqueEntityID(tarefaDTO.id)
    );
    tarefaOrError.isFailure ? console.log(tarefaOrError.error) : '';
    tarefaOrError.isSuccess ? listTarefa.push(tarefaOrError.getValue()):null;
    })

    return listTarefa;
  }

  public static toPersistence(tarefa: Tarefa): any {
    const a = {
      domainId: tarefa.id.toString(),
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
    }
    return a;
  }
}