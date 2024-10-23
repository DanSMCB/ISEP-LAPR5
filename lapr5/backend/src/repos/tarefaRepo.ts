import { Service, Inject } from 'typedi';

import ITarefaRepo from '../services/IRepos/ITarefaRepo';
import { Tarefa } from '../domain/tarefa';
import { TarefaId } from '../domain/tarefaId';
import { TarefaMap } from '../mappers/TarefaMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { ITarefaPersistence } from '../dataschema/ITarefaPersistence';

@Service()
export default class TarefaRepo implements ITarefaRepo {
  private models: any;

  constructor(@Inject('tarefaSchema') private tarefaSchema: Model<ITarefaPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(tarefa: Tarefa): Promise<boolean> {
    const idX = tarefa.id instanceof TarefaId ? (<TarefaId>tarefa.id).toValue() : tarefa.id;

    const query = { id: idX };
    const tarefaDocument = await this.tarefaSchema.findOne(query as FilterQuery<ITarefaPersistence & Document>);

    return !!tarefaDocument === true;
  }

  public async save(tarefa: Tarefa): Promise<Tarefa> {
    const query = { domainId: tarefa.id.toString() };

    const tarefaDocument = await this.tarefaSchema.findOne(query);

    try {
      if (tarefaDocument === null) {
        const rawTarefa: any = TarefaMap.toPersistence(tarefa);

        const tarefaCreated = await this.tarefaSchema.create(rawTarefa);

        return TarefaMap.toDomain(tarefaCreated);
      } else {
        tarefaDocument.codigo = tarefa.codigo;
        tarefaDocument.descricao = tarefa.descricao;
        tarefaDocument.robot = tarefa.robot;
        tarefaDocument.tipoDeRobot = tarefa.tipoDeRobot;
        tarefaDocument.estado = tarefa.estado;
        tarefaDocument.tipoDeTarefa = tarefa.tipoDeTarefa;
        tarefaDocument.contactoRequisitante = tarefa.contactoRequisitante;

        // No caso de se tratar de uma tarefa do tipo: vigilancia
        tarefaDocument.contactoIncidente = tarefa.contactoIncidente;
        tarefaDocument.edificio = tarefa.edificio;
        tarefaDocument.pisos = tarefa.pisos;

        // No caso de se tratar de uma tarefa do tipo: entrega de objetos
        tarefaDocument.salaRecolha = tarefa.salaRecolha;
        tarefaDocument.salaEntrega = tarefa.salaEntrega;
        tarefaDocument.contactoRecolha = tarefa.contactoRecolha;
        tarefaDocument.contactoEntrega = tarefa.contactoEntrega;

        await tarefaDocument.save();

        return tarefa;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByCodigo(codigo: string): Promise<Tarefa> {
    const query = { codigo: codigo };
    const tarefaRecord = await this.tarefaSchema.findOne(query as FilterQuery<ITarefaPersistence & Document>);

    if (tarefaRecord != null) {
      return TarefaMap.toDomain(tarefaRecord);
    } else return null;
  }

  public async getAll(): Promise<Tarefa[]> {
    const query = {};
    const listTarefaRecord = await this.tarefaSchema.find(query as FilterQuery<ITarefaPersistence & Document>);

    if (listTarefaRecord != null) {
      return TarefaMap.toDomainList(listTarefaRecord);
    } else return null;
  }
}