

export default interface IPassagemDTO {
  id: string;
  passagemId: string;
  connection: Array<{ edificio: string; piso: string }>;
}
