import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";

import IPassagemDTO from "../dto/IPassagemDTO";
import { PassagemId } from "./passagemId";

interface PassagemProps {
  passagemId: string;
  connection: Array<{ edificio: string; piso: string }>;
}

export class Passagem extends AggregateRoot<PassagemProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get passagemId(): PassagemId {
    return new PassagemId(this.passagemId.toValue());
  }

  get connection(): Array<{ edificio: string; piso: string }> {
    return this.props.connection;
  }

  set passagemId ( value: string) {
    this.props.passagemId = value;
  }

  set connection ( value: Array<{ edificio: string; piso: string }>) {
    this.props.connection = value;
  }

  private constructor(props: PassagemProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    passagemDTO: IPassagemDTO,
    id?: UniqueEntityID
  ): Result<Passagem> {
    const passagemId = passagemDTO.passagemId;
    const connection = passagemDTO.connection;

    if (!!passagemId === false || passagemId.length === 0) {
      return Result.fail<Passagem>("Must provide a passagem id");
    } else {
      const passagem = new Passagem(
        { passagemId: passagemId, connection: connection },
        id
      );
      return Result.ok<Passagem>(passagem);
    }
  }
}
