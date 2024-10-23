import { Result } from "../../core/logic/Result";
import IEdificioDTO from "../../dto/IEdificioDTO";

export default interface IEdificioService  {
  createEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>>;
  updateEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>>;

  getEdificio (edificioId: string): Promise<Result<IEdificioDTO>>;
  getAllEdificio (): Promise<Result<IEdificioDTO[]>>;
  getAllEdificioMinMaxPiso (min: number, max: number): Promise<Result<IEdificioDTO[]>>;
}