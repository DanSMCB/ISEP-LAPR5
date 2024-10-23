import { Request, Response, NextFunction } from 'express';

export default interface IUserController  {
    signUp(req: Request, res: Response, next: NextFunction);
    signIn(req: Request, res: Response, next: NextFunction);
    getAllUtilizador(req: Request, res: Response, next: NextFunction);
    getAllUtilizadorNaoAprovado(req: Request, res: Response, next: NextFunction);
    updateUtilizadorState(req: Request, res: Response, next: NextFunction);
    updateUtilizador(req: Request, res: Response, next: NextFunction);
    verifyCurrentPassword(req: Request, res: Response, next: NextFunction);
    deleteUtilizador(req: Request, res: Response, next: NextFunction);
}