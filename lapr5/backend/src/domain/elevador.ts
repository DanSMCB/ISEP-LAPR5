import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { ElevadorId } from "./elevadorId";

import IElevadorDTO from "../dto/IElevadorDTO";

interface ElevadorProps {
    codigo: string;
    edificio: string;
    pisos: Array<{ piso: string }>;
  }

export class Elevador extends AggregateRoot<ElevadorProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get elevadorId(): ElevadorId {
    return new ElevadorId(this.elevadorId.toValue());
  }

  get codigo (): string {
    return this.props.codigo;
  }

  get edificio (): string {
    return this.props.edificio;
  }

  get pisos(): Array<{ piso: string }> {
    return this.props.pisos;
  }

  set codigo ( value: string) {
    this.props.codigo = value;
  }
  
  set edificio ( value: string) {
    this.props.edificio = value;
  }
  
  set pisos(value: Array<{ piso: string }>) {
    this.props.pisos = value;
  }

  private constructor (props: ElevadorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (elevadorDTO: IElevadorDTO, id?: UniqueEntityID): Result<Elevador>{
    const codigo = elevadorDTO.codigo;
    const edificio = elevadorDTO.edificio;
    const pisos = elevadorDTO.pisos;

    if (!!codigo === false || codigo.length === 0) {
      return Result.fail<Elevador>('Must provide a elevador code')
    } else {
      const elevador = new Elevador({ codigo: codigo, edificio: edificio, pisos: pisos}, id);
      return Result.ok<Elevador>( elevador )
    }
  }
}
