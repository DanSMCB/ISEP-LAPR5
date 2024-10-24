import { Request, Response, NextFunction } from 'express';

export default interface ISalaController  {
  createSala(req: Request, res: Response, next: NextFunction);
  updateSala(req: Request, res: Response, next: NextFunction);
  getAllSala(req: Request, res: Response, next: NextFunction);
}