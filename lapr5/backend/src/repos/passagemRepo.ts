import { Service, Inject } from 'typedi';

import IPassagemRepo from '../services/IRepos/IPassagemRepo';
import { Passagem } from '../domain/passagem';
import { PassagemId } from '../domain/passagemId';
import { PassagemMap } from '../mappers/PassagemMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IPassagemPersistence } from '../dataschema/IPassagemPersistence';


@Service()
export default class PassagemRepo implements IPassagemRepo {
  private models: any;

  constructor(@Inject('passagemSchema') private passagemSchema: Model<IPassagemPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(passagem: Passagem): Promise<boolean> {
    const idX = passagem.id instanceof PassagemId ? (<PassagemId>passagem.id).toValue() : passagem.id;

    const query = { id: idX };
    const passagemDocument = await this.passagemSchema.findOne(query as FilterQuery<IPassagemPersistence & Document>);

    return !!passagemDocument === true;
  }

  public async save(passagem: Passagem): Promise<Passagem> {
    const query = { domainId: passagem.id.toString() };
    
    const passagemDocument = await this.passagemSchema.findOne(query);
    
    try {
      if (passagemDocument === null) {
        
        const rawPassagem: any = PassagemMap.toPersistence(passagem);
      
        const passagemCreated = await this.passagemSchema.create(rawPassagem);
        
        return PassagemMap.toDomain(passagemCreated);
      } else {
        passagemDocument.connection = passagem.connection;

        await passagemDocument.save();

        return passagem;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findById(passagemId: string): Promise<Passagem> {
    const query = { passagemId: passagemId };
    const passagemRecord = await this.passagemSchema.findOne(query as FilterQuery<IPassagemPersistence & Document>);

    if (passagemRecord != null) {
      return PassagemMap.toDomain(passagemRecord);
    } else return null;
  }

  public async getAll(): Promise<Passagem[]> {
    const query = {  };
    const listPassagemRecord = await this.passagemSchema.find(query as FilterQuery<IPassagemPersistence & Document>);

    if (listPassagemRecord != null) {
      return PassagemMap.toDomainList(listPassagemRecord);
    } else {
      return null;
    }
  }
} 
