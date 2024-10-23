import { Repo } from "../../core/infra/Repo";
import { Tarefa } from "../../domain/tarefa";

export default interface ITarefaRepo extends Repo<Tarefa> {
  save(tarefa: Tarefa): Promise<Tarefa>;
  findByCodigo (codigo: string): Promise<Tarefa>;
  getAll(): Promise<Tarefa[]>;
}