import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { PisoId } from "./pisoId";

import IPisoDTO from "../dto/IPisoDTO";

interface PisoProps {
  edificio: string;
  piso: string;
  descricao: string;
  passagens: Array<{ passagem: string }>;
  salas: Array<{ sala: string }>;
}

export class Piso extends AggregateRoot<PisoProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get pisoId (): PisoId {
    return new PisoId(this.pisoId.toValue());
  }

  get edificio (): string {
    return this.props.edificio;
  }

  get piso (): string {
    return this.props.piso;
  }

  get descricao (): string {
    return this.props.descricao;
  }

  get passagens(): Array<{ passagem: string }> {
    return this.props.passagens;
  }

  get salas(): Array<{ sala: string }> {
    return this.props.salas;
  }

  set edificio (value: string) {
    this.props.piso = value;
  }

  set piso (value: string) {
    this.props.piso = value;
  }

  set descricao (value: string) {
    this.props.descricao = value;
  }

  set passagens (value: Array<{ passagem: string }>) {
    this.props.passagens = value;
  }

  set salas (value: Array<{ sala: string }>) {
    this.props.salas = value;
  }

  private constructor (props: PisoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (pisoDTO: IPisoDTO, id?: UniqueEntityID): Result<Piso> {
    const edificio = pisoDTO.edificio;
    const piso = pisoDTO.piso;
    const descricao = pisoDTO.descricao;
    const passagens = pisoDTO.passagens;
    const salas = pisoDTO.salas;

    if (!!piso === false) {
      return Result.fail<Piso>('Must provide a Floor number')
    } else {
      const piso_ = new Piso({ edificio: edificio, piso: piso, descricao: descricao, passagens: passagens, salas: salas}, id);
      return Result.ok<Piso>( piso_ )
    }
  }
}
