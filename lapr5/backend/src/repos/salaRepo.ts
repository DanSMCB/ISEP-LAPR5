import { Service, Inject } from 'typedi';

import ISalaRepo from "../services/IRepos/ISalaRepo";
import { Sala } from "../domain/sala";
import { SalaId } from "../domain/salaId";
import { SalaMap } from "../mappers/SalaMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { ISalaPersistence } from '../dataschema/ISalaPersistence';

@Service()
export default class SalaRepo implements ISalaRepo {
  private models: any;

  constructor(
    @Inject('salaSchema') private salaSchema : Model<ISalaPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(sala: Sala): Promise<boolean> {

    const idX = sala.id;

    const query = { id: idX };
    const salaDocument = await this.salaSchema.findOne(query as FilterQuery<ISalaPersistence & Document>);

    return !!salaDocument === true;
  }

  public async create (sala: Sala): Promise<Sala> {
    const query = { nome: sala.nome}; 

    const salaDocument = await this.salaSchema.findOne(query);

    try {
      if (salaDocument === null) {
        const rawSala: any = SalaMap.toPersistence(sala);

        const salaCreated = await this.salaSchema.create(rawSala);

        return SalaMap.toDomain(salaCreated);
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  //  Update Sala
  public async save (sala: Sala): Promise<Sala> {
    const query = { domainId: sala.id.toString()}; 

    const salaDocument = await this.salaSchema.findOne(query);
    try {
        salaDocument.nome = sala.nome;
        salaDocument.descricao = sala.descricao;
        salaDocument.categoria = sala.categoria;
        salaDocument.tamanho = sala.tamanho;
        salaDocument.edificio = sala.edificio;
        salaDocument.piso = sala.piso;

        await salaDocument.save();

        return sala;
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (nome: string): Promise<Sala> {
    const query = { nome: nome};
    const salaRecord = await this.salaSchema.findOne( query as FilterQuery<ISalaPersistence & Document>);

    if( salaRecord != null) {
      return SalaMap.toDomain(salaRecord);
    }
    else
      return null;
  }

  public async getAll(): Promise<Sala[]> {
    const query = {};
    const listSalaRecord = await this.salaSchema.find(query as FilterQuery<ISalaPersistence & Document>);
    if (listSalaRecord != null) {
     return SalaMap.toDomainList(listSalaRecord);
    }
    else
      return null;
  }
}