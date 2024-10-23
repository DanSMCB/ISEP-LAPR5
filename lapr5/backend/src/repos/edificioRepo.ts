import { Service, Inject } from 'typedi';

import IEdificioRepo from '../services/IRepos/IEdificioRepo';
import { Edificio } from '../domain/edificio';
import { EdificioId } from '../domain/edificioId';
import { EdificioMap } from '../mappers/EdificioMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IEdificioPersistence } from '../dataschema/IEdificioPersistence';

@Service()
export default class EdificioRepo implements IEdificioRepo {
  private models: any;

  constructor(@Inject('edificioSchema') private edificioSchema: Model<IEdificioPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(edificio: Edificio): Promise<boolean> {
    const idX = edificio.id instanceof EdificioId ? (<EdificioId>edificio.id).toValue() : edificio.id;

    const query = { id: idX };
    const edificioDocument = await this.edificioSchema.findOne(query as FilterQuery<IEdificioPersistence & Document>);

    return !!edificioDocument === true;
  }

  public async save(edificio: Edificio): Promise<Edificio> {
    const query = { domainId: edificio.id.toString() };

    const edificioDocument = await this.edificioSchema.findOne(query);

    try {
      if (edificioDocument === null) {
        const rawEdificio: any = EdificioMap.toPersistence(edificio);

        const edificioCreated = await this.edificioSchema.create(rawEdificio);

        return EdificioMap.toDomain(edificioCreated);
      } else {
        edificioDocument.codigo = edificio.codigo;
        edificioDocument.nome = edificio.nome;
        edificioDocument.descricao = edificio.descricao;
        edificioDocument.pisoMaxSize = edificio.pisoMaxSize;

        await edificioDocument.save();

        return edificio;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByCodigo(codigo: string): Promise<Edificio> {
    const query = { codigo: codigo };
    const edificioRecord = await this.edificioSchema.findOne(query as FilterQuery<IEdificioPersistence & Document>);

    if (edificioRecord != null) {
      return EdificioMap.toDomain(edificioRecord);
    } else return null;
  }

  public async getAll(): Promise<Edificio[]> {
    const query = {};
    const listEdificioRecord = await this.edificioSchema.find(query as FilterQuery<IEdificioPersistence & Document>);

    if (listEdificioRecord != null) {
      return EdificioMap.toDomainList(listEdificioRecord);
    } else return null;
  }
}