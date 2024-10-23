import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TipoDeRobotId } from "./tipoDeRobotId";

import ITipoDeRobotDTO from "../dto/ITipoDeRobotDTO";

interface TipoDeRobotProps {
  descricao: string;
  tarefas: Array<{ tarefa: string }>;
}

export class TipoDeRobot extends AggregateRoot<TipoDeRobotProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get tipoDeRobotId (): TipoDeRobotId {
    return new TipoDeRobotId(this.tipoDeRobotId.toValue());
  }

  get descricao (): string {
    return this.props.descricao;
  }

  get tarefas(): Array<{ tarefa: string }> {
    return this.props.tarefas;
  }

  set descricao (value: string) {
    this.props.descricao = value;
  }

  set tarefas (value: Array<{ tarefa: string }>) {
    this.props.tarefas = value;
  }

  private constructor (props: TipoDeRobotProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (tipoDeRobotDTO: ITipoDeRobotDTO, id?: UniqueEntityID): Result<TipoDeRobot> {
    const descricao = tipoDeRobotDTO.descricao;
    const tarefas = tipoDeRobotDTO.tarefas;

    if (!!descricao === false) {
      return Result.fail<TipoDeRobot>('Must provide a description')
    } else {
      const tipoDeRobot_ = new TipoDeRobot({ descricao: descricao, tarefas: tarefas}, id);
      return Result.ok<TipoDeRobot>( tipoDeRobot_ )
    }
  }
}
