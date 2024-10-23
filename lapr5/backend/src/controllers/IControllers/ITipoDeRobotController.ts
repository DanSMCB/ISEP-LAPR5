import { Request, Response, NextFunction } from 'express';

export default interface ITipoDeRobotController  {
    createTipoDeRobot(req: Request, res: Response, next: NextFunction);
    updateTipoDeRobot(req: Request, res: Response, next: NextFunction);
    getAllTipoDeRobot(req: Request, res: Response, next: NextFunction);
}