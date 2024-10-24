import { Result } from "../../core/logic/Result";
import ISalaDTO from "../../dto/ISalaDTO";

export default interface ISalaService  {
  createSala(salaDTO: ISalaDTO): Promise<Result<ISalaDTO>>;
  updateSala(salaDTO: ISalaDTO): Promise<Result<ISalaDTO>>;

  getAllSala (): Promise<Result<ISalaDTO[]>>;
}