import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { EdificioId } from "./edificioId";

import IEdificioDTO from "../dto/IEdificioDTO";
interface EdificioProps {
  codigo: string;
  nome: string;
  descricao: string;
  pisoMaxSize: string;
}

export class Edificio extends AggregateRoot<EdificioProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get edificioId (): EdificioId {
    return new EdificioId(this.edificioId.toValue());
  }

  get codigo (): string {
    return this.props.codigo;
  }

  get nome (): string {
    return this.props.nome;
  }

  get descricao (): string {
    return this.props.descricao;
  }

  get pisoMaxSize (): string {
    return this.props.pisoMaxSize;
  }

  set codigo ( value: string) {
    this.props.codigo = value;
  }

  set nome ( value: string) {
    this.props.nome = value;
  }

  set descricao ( value: string) {
    this.props.descricao = value;
  }

  set pisoMaxSize ( value: string) {
    this.props.pisoMaxSize = value;
  }

  private constructor (props: EdificioProps, id?: UniqueEntityID) {
    super(props, id);
  }
  
  public static create (edificioDTO: IEdificioDTO, id?: UniqueEntityID): Result<Edificio> {
    const codigo = edificioDTO.codigo;
    const nome = edificioDTO.nome;
    const descricao = edificioDTO.descricao;
    const pisoMaxSize = edificioDTO.pisoMaxSize;

    if (!!codigo === false || codigo.length === 0) {
      return Result.fail<Edificio>('Must provide a edificio code')
    } else {
      const edificio = new Edificio({ codigo: codigo, nome: nome, descricao: descricao, pisoMaxSize: pisoMaxSize }, id);
      return Result.ok<Edificio>( edificio )
    }
  }
}