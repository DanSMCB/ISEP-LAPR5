import { Container } from 'typedi';

import { Document, Model } from 'mongoose';
import { IUserPersistence } from '../dataschema/IUserPersistence';

import { Mapper } from "../core/infra/Mapper";

import IUserDTO from "../dto/IUserDTO";

import { User } from "../domain/user";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { UserEmail } from "../domain/userEmail";
import { UserPassword } from "../domain/userPassword";

import RoleRepo from "../repos/roleRepo";

export class UserMap extends Mapper<User> {

  public static toDTO( user: User): IUserDTO {
    return {
      id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.value,
      password: user.password,
      role: user.role,
      phone: user.phone,
      taxpayer: user.taxpayer,
      state: user.state,
    } as IUserDTO;
  }

  public static async toDomain (raw: any): Promise<User> {
    const userEmailOrError = UserEmail.create(raw.email);

    const userOrError = User.create({
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: userEmailOrError.getValue(),
      password: raw.password,
      role: raw.role,
      phone: raw.phone,
      taxpayer: raw.taxpayer,
      state: raw.state,
    }, new UniqueEntityID(raw.domainId))

    userOrError.isFailure ? console.log(userOrError.error) : '';
    
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence (user: User): any {
    const a = {
      domainId: user.id.toString(),
      email: user.email.value,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      phone: user.phone,
      taxpayer: user.taxpayer,
      state: user.state,
    }
    return a;
  }

  public static async toDomainList (user: any | Model<IUserPersistence & Document> ): Promise<User[]> {
    var listUser: User[]=[];
    
    user.forEach(element => {
      const userEmailOrError = UserEmail.create(element.email);

      const userOrError = User.create({
        firstName: element.firstName,
        lastName: element.lastName,
        email: userEmailOrError.getValue(),
        password: element.password,
        role: element.role,
        phone: element.phone,
        taxpayer: element.taxpayer,
        state: element.state,
      }, new UniqueEntityID(element.domainId));
    userOrError.isFailure ? console.log(userOrError.error) : '';
    userOrError.isSuccess ? listUser.push(userOrError.getValue()):null;
    })

    return listUser;
  }
}