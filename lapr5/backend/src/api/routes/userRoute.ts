import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IUserController from '../../controllers/IControllers/IUserController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/utilizador', route);

  const ctrl = Container.get(config.controllers.user.name) as IUserController;

  route.post('/signup',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
        phone: Joi.string().required(),
        taxpayer: Joi.string().allow(''),
        state: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.signUp(req, res, next) );

  route.post('/signin',
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  (req, res, next) => ctrl.signIn(req, res, next));

  route.get('/listall',(req, res, next) => ctrl.getAllUtilizador(req, res, next));

  route.get('/listallNaoAprovado',(req, res, next) => ctrl.getAllUtilizadorNaoAprovado(req, res, next));

  route.post('/verifyCurrentPassword',(req, res, next) => ctrl.verifyCurrentPassword(req, res, next));

  route.patch('/updateUtilizadorState',(req, res, next) => ctrl.updateUtilizadorState(req, res, next));

  route.patch('/updateUtilizador',(req, res, next) => ctrl.updateUtilizador(req, res, next));

  route.delete('/delete', (req, res, next) => ctrl.deleteUtilizador(req, res, next));
}

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  
  
  /*route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });

  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, user_controller.getMe);
};*/
