import { Repo } from '../../core/infra/Repo';
import { Passagem } from '../../domain/passagem';

export default interface IPassagemRepo extends Repo<Passagem> {
  save(passagem: Passagem): Promise<Passagem>;
  findById(Id: string): Promise<Passagem>;
  getAll(): Promise<Passagem[]>;
 
}
