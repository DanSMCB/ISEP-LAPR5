import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/userEmail";
import { Result } from "../../core/logic/Result";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	findByEmail (email: UserEmail | string): Promise<User>;
	findById (id: string): Promise<User>;
	getAll(): Promise<User[]>;
	deleteUtilizador(email: string): Promise<Result<void>>;
}
  