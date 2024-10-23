import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPisoPersistence } from '../dataschema/IPisoPersistence';

import IPisoDTO from "../dto/IPisoDTO";
import { Piso } from "../domain/piso";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class PisoMap extends Mapper<Piso> {
  
  public static toDTO(piso: Piso): IPisoDTO {
    return {
        id: piso.id.toString(),
        edificio: piso.edificio,
        piso: piso.piso,
        descricao: piso.descricao,
        passagens: piso.passagens,
        salas: piso.salas
    } as IPisoDTO;
  }

  public static toDomain (piso: any | Model<IPisoPersistence & Document> ): Piso {
    const pisoOrError = Piso.create(
      piso,
      new UniqueEntityID(piso.domainId)
    );

    pisoOrError.isFailure ? console.log(pisoOrError.error) : '';

    return pisoOrError.isSuccess ? pisoOrError.getValue() : null;
  }

  public static async toDomainList (piso: any | Model<IPisoPersistence & Document> ): Promise<Piso[]> {
    var listPiso: Piso[];
    listPiso=[];
    piso.forEach(element => {
      const pisoDTO: IPisoDTO = {
        id: element.id.toString(),
        edificio: element.edificio,
        piso: element.piso,
        descricao: element.descricao,
        passagens: element.passagens,
        salas: element.salas
      };
      const pisoOrError = Piso.create(
        pisoDTO,
        new UniqueEntityID(pisoDTO.id)
    );
    pisoOrError.isFailure ? console.log(pisoOrError.error) : '';
    pisoOrError.isSuccess ? listPiso.push(pisoOrError.getValue()):null;
    })

    return listPiso;
  }

  public static toPersistence(piso: Piso): any {
    return {
      domainId: piso.id.toString(),
      edificio: piso.edificio,
      piso: piso.piso,
      descricao: piso.descricao,
      passagens: piso.passagens,
      salas: piso.salas
    };
  }
}