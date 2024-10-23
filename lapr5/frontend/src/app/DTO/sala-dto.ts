export class SalaDTO {
    constructor(
        public id: string,
        public nome: string,
        public descricao: string,
        public categoria: string,
        public tamanho: string,
        public edificio: string,
        public piso: string
    ) { }
}
