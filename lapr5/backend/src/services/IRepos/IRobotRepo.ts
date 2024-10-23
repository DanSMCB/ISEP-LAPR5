import { Repo } from "../../core/infra/Repo";
import { Robot } from "../../domain/robot";
import { RobotId } from "../../domain/robotId";

export default interface IRobotRepo extends Repo<Robot> {
  save(robot: Robot): Promise<Robot>;
  findByCodigo (codigo: string): Promise<Robot>;
  getAll(): Promise<Robot[]>;
 
  //findByIds (rolesIds: robotId[]): Promise<robot[]>;
  //saveCollection (roles: robot[]): Promise<robot[]>;
  //removeByrobotIds (roles: robotId[]): Promise<any>
}