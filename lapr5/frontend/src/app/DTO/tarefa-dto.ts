export class TarefaDTO {
    constructor(
        public id: string,
        public codigo: string,
        public descricao: string,
        public robot: string,
        public tipoDeRobot: string,
        public estado: string,
        public contactoRequisitante: string,
        public tipoDeTarefa: string,

        // No caso de se tratar de uma tarefa do tipo: vigilancia
        public contactoIncidente: string,
        public edificio: string,
        public pisos: Array<{ piso: string }>,

        // No caso de se tratar de uma tarefa do tipo: entrega de objetos
        public salaRecolha: string,
        public salaEntrega: string,
        public contactoRecolha: string,
        public contactoEntrega: string
      ) { }  
}
