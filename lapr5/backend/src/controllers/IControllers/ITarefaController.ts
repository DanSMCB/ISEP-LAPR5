import { Request, Response, NextFunction } from 'express';

export default interface ITarefaController  {
    createTarefa(req: Request, res: Response, next: NextFunction);
    getAllTarefa(req: Request, res: Response, next: NextFunction);
    getAllTarefaNaoAprovada(req: Request, res: Response, next: NextFunction);
    updateEstadoDaTarefa(req: Request, res: Response, next: NextFunction);
}