export interface Tarefa {
    codigo: string;
    descricao: string;
    robot: string;
    tipoDeRobot: string;
    estado: string;
    contactoRequisitante: string;
    tipoDeTarefa: string;

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
