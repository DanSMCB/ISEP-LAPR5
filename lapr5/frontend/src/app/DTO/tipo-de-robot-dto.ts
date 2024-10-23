export class TipoDeRobotDTO {
    constructor(
        public id: string,
        public descricao: string,
        public tarefas: Array<{ tarefa: string }>
    ) { }
}
