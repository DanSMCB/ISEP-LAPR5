import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IElevadorPersistence } from '../dataschema/IElevadorPersistence';

import IElevadorDTO from "../dto/IElevadorDTO";
import { Elevador } from "../domain/elevador";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class ElevadorMap extends Mapper<Elevador> {
  
  public static toDTO(elevador: Elevador): IElevadorDTO {
    return {
        id: elevador.id.toString(),
        codigo: elevador.codigo,
        edificio: elevador.edificio,
        pisos: elevador.pisos
    } as IElevadorDTO;
  }

  public static toDomain (elevador: any | Model<IElevadorPersistence & Document> ): Elevador {
    const elevadorOrError = Elevador.create(
      elevador,
      new UniqueEntityID(elevador.domainId)
    );

    elevadorOrError.isFailure ? console.log(elevadorOrError.error) : '';

    return elevadorOrError.isSuccess ? elevadorOrError.getValue() : null;
  }

  public static async toDomainList (elevador: any | Model<IElevadorPersistence & Document> ): Promise<Elevador[]> {
    var listElevador: Elevador[];
    listElevador=[];
    elevador.forEach(element => {
      const elevadorDTO: IElevadorDTO = {
        id: element.id.toString(),
        codigo: element.codigo,
        edificio: element.edificio,
        pisos: element.pisos,
      };
      const elevadorOrError = Elevador.create(
        elevadorDTO,
        new UniqueEntityID(elevadorDTO.id)
    );
    elevadorOrError.isFailure ? console.log(elevadorOrError.error) : '';
    elevadorOrError.isSuccess ? listElevador.push(elevadorOrError.getValue()):null;
    })

    return listElevador;
  }

  public static toPersistence(elevador: Elevador): any {
    const a = {
      domainId: elevador.id.toString(),
      codigo: elevador.codigo,
      edificio: elevador.edificio,
      pisos: elevador.pisos
    }
    return a;
  }
}