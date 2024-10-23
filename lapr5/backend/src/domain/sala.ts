import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { SalaId } from "./salaId";

import ISalaDTO from "../dto/ISalaDTO";

interface SalaProps {
  nome: string;
  descricao: string;
  tamanho: string;
  categoria: string;
  edificio: string;
  piso: string;
}

export class Sala extends AggregateRoot<SalaProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get salaId (): SalaId {
    return new SalaId(this.salaId.toValue());
  }

  get nome (): string {
    return this.props.nome;
  }

  get descricao (): string {
    return this.props.descricao;
  }

  get categoria (): string {
    return this.props.categoria;
  }

  get tamanho (): string {
    return this.props.tamanho;
  }

  get edificio (): string {
    return this.props.edificio;
  }

  get piso (): string {
    return this.props.piso;
  }

  set nome ( value: string) {
    this.props.nome = value;
  }

  set descricao ( value: string) {
    this.props.descricao = value;
  }

  set categoria ( value: string){
    this.props.categoria = value;
  }

  set tamanho ( value: string) {
    this.props.tamanho = value;
  }

  set edificio ( value: string){
    this.props.edificio = value;
  }

  set piso ( value: string){
    this.props.piso = value;
  }
  
  private constructor (props: SalaProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (salaDTO: ISalaDTO, id?: UniqueEntityID): Result<Sala> {
    const nome = salaDTO.nome;
    const descricao = salaDTO.descricao;
    const categoria = salaDTO.categoria;
    const tamanho = salaDTO.tamanho;
    const piso = salaDTO.piso;
    const edificio = salaDTO.edificio;

    if (!!piso === false) {
      return Result.fail<Sala>('Must provide a Sala piso')
    } else {
      const sala_ = new Sala({ nome: nome, descricao: descricao, categoria: categoria, tamanho: tamanho, edificio: edificio, piso: piso}, id);
      return Result.ok<Sala>( sala_ )
    }
  }
}