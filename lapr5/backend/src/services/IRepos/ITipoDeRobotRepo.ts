import { Repo } from "../../core/infra/Repo";
import { TipoDeRobot } from "../../domain/tipoDeRobot";

export default interface ITipoDeRobotRepo extends Repo<TipoDeRobot> {
  create(tipoDeRobot: TipoDeRobot): Promise<TipoDeRobot>;
  save(edificio: TipoDeRobot): Promise<TipoDeRobot>;
  findByDomainId (tipoDeRobotId: string): Promise<TipoDeRobot>;
  getAll(): Promise<TipoDeRobot[]>;

  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}