import { Mapper } from '../core/infra/Mapper';
import { Passagem } from '../domain/passagem';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import IPassagemDTO from '../dto/IPassagemDTO';
import { IPassagemPersistence } from '../dataschema/IPassagemPersistence';
import { Document, Model } from 'mongoose';

export class PassagemMap extends Mapper<Passagem> {
  public static toDTO(passagem: Passagem): IPassagemDTO {
    return {
      id: passagem.id.toString(),
      passagemId: passagem.props.passagemId,
      connection: passagem.props.connection,
    } as IPassagemDTO;
  }

  public static toDomain(passagem: any | Model<IPassagemPersistence & Document> ): Passagem {
    const passagemOrError = Passagem.create(passagem,
      new UniqueEntityID(passagem.domainId)
    );

    passagemOrError.isFailure ? console.log(passagemOrError.error) : '';

    return passagemOrError.isSuccess ? passagemOrError.getValue() : null;
  }

  public static async toDomainList(passagem: any| Model<IPassagemPersistence & Document> ): Promise<Passagem[]> {
    let listPassagem: Passagem[];
    listPassagem = [];
    passagem.forEach(element => {
      const passagemDTO: IPassagemDTO = {
        id: element.id.toString(),
        passagemId: element.passagemId,
        connection: element.connection,
      };
      const passagemOrError = Passagem.create(
        passagemDTO,
        new UniqueEntityID(passagemDTO.id)
    );
    passagemOrError.isFailure ? console.log(passagemOrError.error) : '';
    passagemOrError.isSuccess ? listPassagem.push(passagemOrError.getValue()):null;
    })

    return listPassagem;
  }

  public static toPersistence(passagem: Passagem): any {
    const a = {
      domainId: passagem.id.toString(),
      passagemId: passagem.props.passagemId,
      connection: passagem.props.connection,
    };
    return a;
  }
}
