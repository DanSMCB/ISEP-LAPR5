import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { IUserPersistence } from '../dataschema/IUserPersistence';

import IUserRepo from "../services/IRepos/IUserRepo";
import { User } from "../domain/user";
import { UserId } from "../domain/userId";
import { UserEmail } from "../domain/userEmail";
import { UserMap } from "../mappers/UserMap";

import { Result } from "../core/logic/Result";

@Service()
export default class UserRepo implements IUserRepo {
  private models: any;

  constructor(
    @Inject('userSchema') private userSchema : Model<IUserPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (userId: UserId | string): Promise<boolean> {

    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX}; 
    const userDocument = await this.userSchema.findOne( query );

    return !!userDocument === true;
  }

  public async save (user: User): Promise<User> {
    const query = { domainId: user.id.toString() }; 

    const userDocument = await this.userSchema.findOne( query );

    try {
      if (userDocument === null ) {
        const rawUser: any = UserMap.toPersistence(user);

        const userCreated = await this.userSchema.create(rawUser);

        return UserMap.toDomain(userCreated);
      } else {
        userDocument.firstName = user.firstName;
        userDocument.lastName = user.lastName;
        userDocument.email = user.email.value;
        userDocument.password = user.password;
        userDocument.role = user.role;
        userDocument.phone = user.phone;
        userDocument.taxpayer = user.taxpayer;
        userDocument.state = user.state;
        await userDocument.save();

        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByEmail (email: UserEmail | string): Promise<User> {
    const em = email instanceof UserEmail ? (<UserEmail>email).value : email;

    const query = { email: em };
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return UserMap.toDomain(userRecord);
    }
    else
      return null;
  }

  public async findById (userId: UserId | string): Promise<User> {

    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX }; 
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return UserMap.toDomain(userRecord);
    }
    else
      return null;
  }

  public async getAll(): Promise<User[]> {
    const query = {};
    const listUtilizadorRecord = await this.userSchema.find(query as FilterQuery<IUserPersistence & Document>);

    if (listUtilizadorRecord != null) {
      return UserMap.toDomainList(listUtilizadorRecord);
    } else return null;
  }

  public async deleteUtilizador(email: string): Promise<Result<void>> {
    try {
      const result = await this.userSchema.findOneAndDelete({email: email}).exec();

      if (!result) {
        return Result.fail<void>("User not found");
      }

      return Result.ok<void>();
    } catch (e) {
      throw e;
    }
  }
}