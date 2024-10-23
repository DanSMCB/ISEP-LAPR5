export class PassagemDTO {
    constructor(
        public id: string,
        public passagemId: string,
        public connection: Array<{ edificio: string; piso: string }>
    ) { }
}
