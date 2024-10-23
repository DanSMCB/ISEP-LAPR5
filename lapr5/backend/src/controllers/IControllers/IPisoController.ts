import { Request, Response, NextFunction } from 'express';

export default interface IPisoController  {
    createPiso(req: Request, res: Response, next: NextFunction);
    updatePiso(req: Request, res: Response, next: NextFunction);
    getAllPisosByEdificio(req: Request, res: Response, next: NextFunction);
    getPisosWithConnection(req: Request, res: Response, next: NextFunction);
    loadValidateFloor(req: Request, res: Response, next: NextFunction);
}