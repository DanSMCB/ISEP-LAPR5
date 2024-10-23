export default interface IElevadorDTO {
  id: string;
  codigo: string;
  edificio: string;
  pisos: Array<{ piso: string }>;
}
