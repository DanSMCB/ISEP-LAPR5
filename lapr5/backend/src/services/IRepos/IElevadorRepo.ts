import { Repo } from "../../core/infra/Repo";
import { Elevador } from "../../domain/elevador";

export default interface IElevadorRepo extends Repo<Elevador> {
  create(elevador: Elevador): Promise<Elevador>;
  save(elevador: Elevador): Promise<Elevador>;
  findByCodigo (codigo: string): Promise<Elevador>;
  getAllElevadoresByEdificio(edificio: string): Promise<Elevador[]>;

  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}