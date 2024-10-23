export interface IPassagemPersistence {
  domainId: string;
  passagemId: string;
  connection: Array<{ edificio: string; piso: string }>;
}
