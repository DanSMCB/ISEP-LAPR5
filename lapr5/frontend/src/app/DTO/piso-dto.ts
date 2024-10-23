export class PisoDTO {
    constructor(
        public id: string,
        public edificio: string,
        public piso: string,
        public descricao: string,
        public passagens: Array<{ passagem: string }>,
        public salas: Array<{ sala: string }>
    ) { }
}
