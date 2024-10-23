export class ElevadorDTO {
    constructor(
        public id: string,
        public codigo: string,
        public edificio: string,
        public pisos: Array<{ piso: string }>
      ) { }
}
