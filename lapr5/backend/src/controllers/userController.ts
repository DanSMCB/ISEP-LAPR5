import e, { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IUserController from "./IControllers/IUserController";
import IUserService from '../services/IServices/IUserService';
import IUserDTO from '../dto/IUserDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class UserController implements IUserController{
  constructor(
      @Inject(config.services.user.name) private userServiceInstance : IUserService
  ) {}

  public async signUp(req: Request, res: Response, next: NextFunction) {
    try { 
      const userOrError = await this.userServiceInstance.SignUp(req.body as IUserDTO) as Result<{ userDTO: IUserDTO, token: string }>;

      if (userOrError.isFailure) {
          return res.status(402).send();
      }
      
      const userDTO = userOrError.getValue();
      return res.json( userDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try { 
      const userOrError = await this.userServiceInstance.SignIn(req.body.email as string, req.body.password as string) as Result<{ userDTO: IUserDTO, token: string }>;

      if (userOrError.isFailure) {
          return res.status(402).send();
      }
      
      const userDTO = userOrError.getValue();
      return res.json( userDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAllUtilizador(req: Request, res: Response, next: NextFunction) {  
    try {
      const utilizadorOrError = await this.userServiceInstance.getAllUtilizador();
            
      if (utilizadorOrError.isFailure) {
          return res.status(404).send();
      }

      const utilizadorDTOArray = utilizadorOrError.getValue();
      
      return res.status(201).json( utilizadorDTOArray );
    } catch (e) {
      return next(e);
    }
  };

  public async getAllUtilizadorNaoAprovado(req: Request, res: Response, next: NextFunction) {  
    try {
      const utilizadorOrError = await this.userServiceInstance.getAllUtilizadorNaoAprovado();
            
      if (utilizadorOrError.isFailure) {
          return res.status(404).send();
      }

      const utilizadorDTOArray = utilizadorOrError.getValue();
      
      return res.status(201).json( utilizadorDTOArray );
    } catch (e) {
      return next(e);
    }
  };

  public async updateUtilizadorState(req: Request, res: Response, next: NextFunction) {  
    try {
      const utilizadorOrError = await this.userServiceInstance.updateUtilizadorState(req.body.email as string, req.body.state as string) as Result<IUserDTO>;
      if (utilizadorOrError.isFailure) {
        return res.status(400).send(); // Use 400 for client errors
      }

      return res.status(200).send(); // 200 for successful inhibition
    } catch (e) {
      return next(e);
    }
  };

  public async updateUtilizador(req: Request, res: Response, next: NextFunction) {  
    try {
      const utilizadorOrError = await this.userServiceInstance.updateUtilizador(req.body.firstName as string, req.body.lastName as string, 
        req.body.email as string, req.body.password as string, req.body.phone as string, req.body.taxpayer as string) as Result<IUserDTO>;
      if (utilizadorOrError.isFailure) {
        return res.status(400).send(); // Use 400 for client errors
      }

      return res.status(200).send(); // 200 for successful inhibition
    } catch (e) {
      return next(e);
    }
  };

  public async verifyCurrentPassword(req: Request, res: Response, next: NextFunction) {  
    try {
      const utilizadorOrError = await this.userServiceInstance.verifyCurrentPassword(req.body.email as string, req.body.password as string) as Result<boolean>;
      if (utilizadorOrError.isFailure) {
        return res.status(400).send(); // Use 400 for client errors
      }

      return res.status(200).send(); // 200 for successful inhibition
    } catch (e) {
      return next(e);
    }
  };

  public async deleteUtilizador(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email;

      const result = await this.userServiceInstance.deleteUtilizador(email);

      if (result.isSuccess) {
        res.status(200).json({ success: true, message: 'User deleted successfully' });
      } else {
        res.status(404).json({ success: false, message: result.error });
      }
    } catch (error) {
      next(error);
    }
  }
}

/*import { Response, Request } from 'express';

import { Container} from 'typedi';

import config from '../../config';

import IUserRepo from '../services/IRepos/IUserRepo';

import { UserMap } from "../mappers/UserMap";
import { IUserDTO } from '../dto/IUserDTO';


exports.getMe = async function(req, res: Response) {
  
    // NB: a arquitetura ONION não está a ser seguida aqui

    const userRepo = Container.get(config.repos.user.name) as IUserRepo

    if( !req.token || req.token == undefined )
        return res.json( new Error("Token inexistente ou inválido")).status(401);

    const user = await userRepo.findById( req.token.id );
    if (!user)
        return res.json( new Error("Utilizador não registado")).status(401);

    const userDTO = UserMap.toDTO( user ) as IUserDTO;
    return res.json( userDTO ).status(200);
}*/
