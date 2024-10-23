import { Result } from "../../core/logic/Result";
import ITarefaDTO from "../../dto/ITarefaDTO";

export default interface ITarefaService  {
  createTarefa(tarefaDTO: ITarefaDTO): Promise<Result<ITarefaDTO>>;
  getTarefa (tarefaId: string): Promise<Result<ITarefaDTO>>;
  getAllTarefa (): Promise<Result<ITarefaDTO[]>>;
  getAllTarefaNaoAprovada (): Promise<Result<ITarefaDTO[]>>;
  updateEstadoDaTarefa(codigo: string, estado: string): Promise<Result<ITarefaDTO>>;
}