export default interface IPisoDTO {
  id: string;
  edificio: string;
  piso: string;
  descricao: string;
  passagens: Array<{ passagem: string }>;
  salas: Array<{ sala: string }>;
}