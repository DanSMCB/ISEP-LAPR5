export interface ITipoDeRobotPersistence {
    domainId: string;
    descricao: string;
    tarefas: Array<{ tarefa: string }>;
}