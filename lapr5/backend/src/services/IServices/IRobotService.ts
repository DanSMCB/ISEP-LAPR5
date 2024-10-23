import { Result } from "../../core/logic/Result";
import { RobotId } from "../../domain/robotId";
import IRobotDTO from "../../dto/IRobotDTO";

export default interface IRobotService  {
  createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;

  inhibitRobot(numeroSerie: string): Promise<Result<IRobotDTO>>;
  
  getRobot (numeroSerie: string): Promise<Result<IRobotDTO>>;
  getAllRobot (): Promise<Result<IRobotDTO[]>>;
}
