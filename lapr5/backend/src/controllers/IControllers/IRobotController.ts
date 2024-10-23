import { Request, Response, NextFunction } from 'express';

export default interface IRobotController  {
    createRobot(req: Request, res: Response, next: NextFunction);
    updateRobot(req: Request, res: Response, next: NextFunction);
    getRobot(req: Request, res: Response, next: NextFunction);
    getAllRobot(req: Request, res: Response, next: NextFunction);
    inhibitRobot(req: Request, res: Response, next: NextFunction);
}