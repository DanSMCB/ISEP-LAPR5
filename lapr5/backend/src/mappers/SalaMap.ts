import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ISalaPersistence } from '../dataschema/ISalaPersistence';

import ISalaDTO from "../dto/ISalaDTO";
import { Sala } from "../domain/sala";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class SalaMap extends Mapper<Sala> {
  
  public static toDTO(sala: Sala): ISalaDTO {
    return {
      id: sala.id.toString(),
      nome: sala.nome,
      descricao: sala.descricao,
      tamanho: sala.tamanho,
      categoria: sala.categoria,
      edificio: sala.edificio,
      piso: sala.piso
    } as ISalaDTO;
  }

  public static toDomain (sala: any | Model<ISalaPersistence & Document> ): Sala {
    const salaOrError = Sala.create(
      sala,
      new UniqueEntityID(sala.domainId)
    );

    salaOrError.isFailure ? console.log(salaOrError.error) : '';

    return salaOrError.isSuccess ? salaOrError.getValue() : null;
  }

  public static async toDomainList (sala: any | Model<ISalaPersistence & Document> ): Promise<Sala[]> {
    var listSala: Sala[];
    listSala=[];
    sala.forEach(element => {
      const salaDTO: ISalaDTO = {
        id: element.id.toString(),
        nome: element.nome,
        descricao: element.descricao,
        tamanho: element.tamanho,
        categoria: element.categoria,
        edificio: element.edificio,
        piso: element.piso
      };
      const salaOrError = Sala.create(
        salaDTO,
        new UniqueEntityID(salaDTO.id)
    );
    salaOrError.isFailure ? console.log(salaOrError.error) : '';
    salaOrError.isSuccess ? listSala.push(salaOrError.getValue()):null;
    })

    return listSala;
  }

  public static toPersistence(sala: Sala): any {
    const a = {
      domainId: sala.id.toString(),
      nome: sala.nome,
      descricao: sala.descricao,
      tamanho: sala.tamanho,
      categoria: sala.categoria,
      edificio: sala.edificio,
      piso: sala.piso
    }
    return a;
  }
}