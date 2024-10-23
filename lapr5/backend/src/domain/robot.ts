import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { RobotId } from "./robotId";

import IRobotDTO from "../dto/IRobotDTO";

interface RobotProps {
    numeroSerie : string;
    codigo : string;
    nickname : string;
    marca : string;
    estado : string;
    tipoDeRobot : string
}

export class Robot extends AggregateRoot<RobotProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get robotId (): RobotId {
    return new RobotId(this.robotId.toValue());
  }

  get numeroSerie (): string {
    return this.props.numeroSerie;
  }

  set numeroSerie ( value: string) {
    this.props.numeroSerie = value;
    
  }
  get codigo (): string {
    return this.props.codigo;
  }

  set codigo ( value: string) {
    this.props.codigo = value;
    
  }
  get nickname (): string {
    return this.props.nickname;
  }

  set nickname ( value: string) {
    this.props.nickname = value;
    
  }
  get marca (): string {
    return this.props.marca;
  }

  set marca ( value: string) {
    this.props.marca = value;
    
  }
  get estado (): string {
    return this.props.estado;
  }

  set estado ( value: string) {
    this.props.estado = value;
    
  }
  get tipoDeRobot (): string {
    return this.props.tipoDeRobot;
  }

  set tipoDeRobot ( value: string) {
    this.props.tipoDeRobot = value;
    
  }
  private constructor (props: RobotProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (robotDTO: IRobotDTO, id?: UniqueEntityID): Result<Robot> {
    const numeroSerie = robotDTO.numeroSerie;
    const codigo = robotDTO.codigo;
    const nickname = robotDTO.nickname;
    const marca = robotDTO.marca;
    const estado = robotDTO.estado;
    const tipoDeRobot = robotDTO.tipoDeRobot;
    if (!!numeroSerie === false || numeroSerie.length === 0) {
      return Result.fail<Robot>('Must provide a robot serial number')
    } else {
      const robot = new Robot({ numeroSerie: numeroSerie, codigo: codigo, nickname : nickname, marca:marca, estado:estado, tipoDeRobot:tipoDeRobot }, id);
      return Result.ok<Robot>( robot )
    }
  }
}
