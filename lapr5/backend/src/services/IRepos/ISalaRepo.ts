import { Repo } from "../../core/infra/Repo";
import { Sala } from "../../domain/sala";

export default interface IEdificioRepo extends Repo<Sala> {
  create(sala: Sala): Promise<Sala>;
  save(sala: Sala): Promise<Sala>;
  findByDomainId (codigo: string): Promise<Sala>;
  getAll(): Promise<Sala[]>;
}