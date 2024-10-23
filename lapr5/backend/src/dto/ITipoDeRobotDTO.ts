export default interface ITipoDeRobotDTO {
  id: string;
  descricao: string;
  tarefas: Array<{ tarefa: string }>;
}