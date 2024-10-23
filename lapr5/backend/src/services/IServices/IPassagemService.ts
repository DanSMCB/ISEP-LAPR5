import { Result } from "../../core/logic/Result";
import IPassagemDTO from "../../dto/IPassagemDTO";

export default interface IPassagemService {
  createPassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>>;
  updatePassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>>;
  getPassagemBetweenEdificios(edificio1: string, edificio2:string): Promise<Result<IPassagemDTO[]>>;
}
