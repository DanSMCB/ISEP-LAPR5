import { Request, Response, NextFunction } from 'express';

export default interface IEdificioController  {
    createEdificio(req: Request, res: Response, next: NextFunction);
    updateEdificio(req: Request, res: Response, next: NextFunction);
    getAllEdificio(req: Request, res: Response, next: NextFunction);
    getAllEdificioMinMaxPiso(req: Request, res: Response, next: NextFunction);
}