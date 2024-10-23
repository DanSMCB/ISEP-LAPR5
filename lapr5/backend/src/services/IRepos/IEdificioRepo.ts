import { Repo } from "../../core/infra/Repo";
import { Edificio } from "../../domain/edificio";

export default interface IEdificioRepo extends Repo<Edificio> {
  save(edificio: Edificio): Promise<Edificio>;
  findByCodigo (codigo: string): Promise<Edificio>;
  getAll(): Promise<Edificio[]>;
      
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}