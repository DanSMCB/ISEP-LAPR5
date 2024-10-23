import { Result } from "../../core/logic/Result";
import ITipoDeRobotDTO from "../../dto/ITipoDeRobotDTO";

export default interface ITipoDeRobotService  {
  createTipoDeRobot(tipoDeRobotDTO: ITipoDeRobotDTO): Promise<Result<ITipoDeRobotDTO>>;
  updateTipoDeRobot(tipoDeRobotDTO: ITipoDeRobotDTO, tipoDeRobotId: string): Promise<Result<ITipoDeRobotDTO>>;

  getTipoDeRobot (tipoDeRobotId: string): Promise<Result<ITipoDeRobotDTO>>;
  getAllTipoDeRobot (): Promise<Result<ITipoDeRobotDTO[]>>;
}