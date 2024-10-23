import { Repo } from "../../core/infra/Repo";
import { Piso } from "../../domain/piso";

export default interface IPisoRepo extends Repo<Piso> {
  create(piso: Piso): Promise<Piso>;
  save(piso: Piso): Promise<Piso>;
  findByEdificioAndPiso (edificio: string, piso: string): Promise<Piso>;
  getAllPisosByEdificio(edificio: string): Promise<Piso[]>;
  getPisosWithConnection(): Promise<Piso[]>;
  getAll(): Promise<Piso[]>;

  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}