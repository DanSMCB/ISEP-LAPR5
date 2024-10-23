import { Result } from "../../core/logic/Result";
import IUserDTO from "../../dto/IUserDTO";

export default interface IUserService  {
  SignUp(userDTO: IUserDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>;
  SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>>;
  getAllUtilizador (): Promise<Result<IUserDTO[]>>;
  getAllUtilizadorNaoAprovado (): Promise<Result<IUserDTO[]>>;
  updateUtilizadorState(email: string, state: string): Promise<Result<IUserDTO>>;
  updateUtilizador(firstName: string, lastName: string, email: string, password: string, phone: string, taxpayer: string): Promise<Result<IUserDTO>>;
  verifyCurrentPassword(email: string, password: string): Promise<Result<boolean>>;
  deleteUtilizador(email: string): Promise<Result<void>>;
}
