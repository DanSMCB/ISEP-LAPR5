export class RobotDTO {
    constructor(
        public id: string,
        public numeroSerie : string,
        public codigo : string,
        public nickname : string,
        public marca : string,
        public estado : string,
        public tipoDeRobot : string
    ) { }
}
