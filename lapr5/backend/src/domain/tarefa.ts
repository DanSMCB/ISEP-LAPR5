import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TarefaId } from "./tarefaId";

import ITarefaDTO from "../dto/ITarefaDTO";

interface TarefaProps {
    codigo: string;
    descricao: string;
    robot: string;
    tipoDeRobot: string;
    estado: string;
    tipoDeTarefa: string;
    contactoRequisitante: string;

    // No caso de se tratar de uma tarefa do tipo: vigilancia
    contactoIncidente: string;
    edificio: string;
    pisos: Array<{ piso: string }>;
    
    // No caso de se tratar de uma tarefa do tipo: entrega de objetos
    salaRecolha: string;
    salaEntrega: string;
    contactoRecolha: string;
    contactoEntrega: string;
}

export class Tarefa extends AggregateRoot<TarefaProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get tarefaId (): TarefaId {
    return new TarefaId(this.tarefaId.toValue());
  }

  get codigo (): string {
    return this.props.codigo;
  }

  get descricao (): string {
    return this.props.descricao;
  }

  get robot (): string {
    return this.props.robot;
  }

  get tipoDeRobot (): string {
    return this.props.tipoDeRobot;
  }

  get estado (): string {
    return this.props.estado;
  }

  get contactoRequisitante (): string {
    return this.props.contactoRequisitante;
  }

  get tipoDeTarefa (): string {
    return this.props.tipoDeTarefa;
  }

  get contactoIncidente (): string {
    return this.props.contactoIncidente;
  }

  get edificio (): string {
    return this.props.edificio;
  }

  get pisos (): Array<{ piso: string }> {
    return this.props.pisos;
  }

  get salaRecolha (): string {
    return this.props.salaRecolha;
  }

  get salaEntrega (): string {
    return this.props.salaEntrega;
  }

  get contactoRecolha (): string {
    return this.props.contactoRecolha;
  }

  get contactoEntrega (): string {
    return this.props.contactoEntrega;
  }

  set codigo ( value: string) {
    this.props.codigo = value;
  }

  set descricao ( value: string) {
    this.props.descricao = value;
  }

  set robot ( value: string) {
    this.props.robot = value;
  }

  set tipoDeRobot ( value: string) {
    this.props.tipoDeRobot = value;
  }

  set estado ( value: string) {
    this.props.estado = value;
  }

  set contactoRequisitante ( value: string) {
    this.props.contactoRequisitante = value;
  }

  set tipoDeTarefa ( value: string) {
    this.props.tipoDeTarefa = value;
  }

  set contactoIncidente ( value: string) {
    this.props.contactoIncidente = value;
  }

  set edificio ( value: string) {
    this.props.edificio = value;
  }

  set pisos ( value: Array<{ piso: string }>) {
    this.props.pisos = value;
  }

  set salaRecolha ( value: string) {
    this.props.salaRecolha = value;
  }

  set salaEntrega ( value: string) {
    this.props.salaEntrega = value;
  }

  set contactoRecolha ( value: string) {
    this.props.contactoRecolha = value;
  }

  set contactoEntrega ( value: string) {
    this.props.contactoEntrega = value;
  }

  private constructor (props: TarefaProps, id?: UniqueEntityID) {
    super(props, id);
  }
  
  public static create (tarefaDTO: ITarefaDTO, id?: UniqueEntityID): Result<Tarefa> {
    const codigo = tarefaDTO.codigo;
    const descricao = tarefaDTO.descricao;
    const robot = tarefaDTO.robot;
    const tipoDeRobot = tarefaDTO.tipoDeRobot;
    const estado = tarefaDTO.estado;
    const contactoRequisitante = tarefaDTO.contactoRequisitante;
    const tipoDeTarefa = tarefaDTO.tipoDeTarefa;

    // No caso de se tratar de uma tarefa do tipo: vigilancia
    const contactoIncidente = tarefaDTO.contactoIncidente;
    const edificio = tarefaDTO.edificio;
    const pisos = tarefaDTO.pisos;

    // No caso de se tratar de uma tarefa do tipo: entrega de objetos
    const salaRecolha = tarefaDTO.salaRecolha;
    const salaEntrega = tarefaDTO.salaEntrega;
    const contactoRecolha = tarefaDTO.contactoRecolha;
    const contactoEntrega = tarefaDTO.contactoEntrega;

    if (!!codigo === false || codigo.length === 0) {
      return Result.fail<Tarefa>('Must provide a tarefa code')
    } else {
      const tarefa = new Tarefa({ codigo: codigo, descricao: descricao, robot: robot, tipoDeRobot: tipoDeRobot, estado: estado, contactoRequisitante: contactoRequisitante, tipoDeTarefa: tipoDeTarefa,
        contactoIncidente: contactoIncidente, edificio: edificio, pisos: pisos,
        salaRecolha: salaRecolha, salaEntrega: salaEntrega,
        contactoRecolha: contactoRecolha, contactoEntrega: contactoEntrega  
        }, id);
      return Result.ok<Tarefa>( tarefa )
    }
  }
}