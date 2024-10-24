import { Request, Response, NextFunction } from 'express';

export default interface IElevadorController  {
    createElevador(req: Request, res: Response, next: NextFunction);
    updateElevador(req: Request, res: Response, next: NextFunction);
    getAllElevadoresByEdificio(req: Request, res: Response, next: NextFunction);
}