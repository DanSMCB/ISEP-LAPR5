import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IEdificioPersistence } from '../dataschema/IEdificioPersistence';

import IEdificioDTO from "../dto/IEdificioDTO";
import { Edificio } from "../domain/edificio";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class EdificioMap extends Mapper<Edificio> {
  
  public static toDTO(edificio: Edificio): IEdificioDTO {
    return {
        id: edificio.id.toString(),
        codigo: edificio.codigo,
        nome: edificio.nome,
        descricao: edificio.descricao,
        pisoMaxSize: edificio.pisoMaxSize
    } as IEdificioDTO;
  }

  public static toDomain (edificio: any | Model<IEdificioPersistence & Document> ): Edificio {
    const edificioOrError = Edificio.create(
      edificio,
      new UniqueEntityID(edificio.domainId)
    );

    edificioOrError.isFailure ? console.log(edificioOrError.error) : '';

    return edificioOrError.isSuccess ? edificioOrError.getValue() : null;
  }

  public static async toDomainList (edificio: any | Model<IEdificioPersistence & Document> ): Promise<Edificio[]> {
    var listEdificio: Edificio[];
    listEdificio=[];
    edificio.forEach(element => {
      const edificioDTO: IEdificioDTO = {
        id: element.id.toString(),
        codigo: element.codigo,
        nome: element.nome,
        descricao: element.descricao,
        pisoMaxSize: element.pisoMaxSize,
      };
      const edificioOrError = Edificio.create(
        edificioDTO,
        new UniqueEntityID(edificioDTO.id)
    );
    edificioOrError.isFailure ? console.log(edificioOrError.error) : '';
    edificioOrError.isSuccess ? listEdificio.push(edificioOrError.getValue()):null;
    })

    return listEdificio;
  }

  public static toPersistence(edificio: Edificio): any {
    const a = {
      domainId: edificio.id.toString(),
      codigo: edificio.codigo,
      nome: edificio.nome,
      descricao: edificio.descricao,
      pisoMaxSize: edificio.pisoMaxSize
    }
    return a;
  }
}