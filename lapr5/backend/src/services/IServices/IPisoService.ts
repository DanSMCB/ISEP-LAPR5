import { Result } from "../../core/logic/Result";
import IPisoDTO from "../../dto/IPisoDTO";

export default interface IPisoService  {
  createPiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>>;
  updatePiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>>;

  getAllPisosByEdificio (edificio: string): Promise<Result<IPisoDTO[]>>;
  getPisosWithConnection (): Promise<Result<IPisoDTO[]>>
  loadValidateFloor(json: string): Promise<Result<string>>;
}