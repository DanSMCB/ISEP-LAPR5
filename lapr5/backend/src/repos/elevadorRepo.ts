import { Service, Inject } from 'typedi';

import IElevadorRepo from '../services/IRepos/IElevadorRepo';
import { Elevador } from '../domain/elevador';
import { ElevadorId } from '../domain/elevadorId';
import { ElevadorMap } from '../mappers/ElevadorMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IElevadorPersistence } from '../dataschema/IElevadorPersistence';

@Service()
export default class ElevadorRepo implements IElevadorRepo {
  private models: any;

  constructor(@Inject('elevadorSchema') private elevadorSchema: Model<IElevadorPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(elevador: Elevador): Promise<boolean> {
    const idX = elevador.id instanceof ElevadorId ? (<ElevadorId>elevador.id).toValue() : elevador.id;

    const query = { id: idX };
    const elevadorDocument = await this.elevadorSchema.findOne(query as FilterQuery<IElevadorPersistence & Document>);

    return !!elevadorDocument === true;
  }

  public async create (elevador: Elevador): Promise<Elevador> {
    const query = { codigo: elevador.codigo }; 

    const elevadorDocument = await this.elevadorSchema.findOne(query);

    try {
      if (elevadorDocument === null) {
        const rawElevador: any = ElevadorMap.toPersistence(elevador);

        const elevadorCreated = await this.elevadorSchema.create(rawElevador);

        return ElevadorMap.toDomain(elevadorCreated);
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  //  Update Elevador
  public async save (elevador: Elevador): Promise<Elevador> {
    const query = { domainId: elevador.id.toString()}; 

    const elevadorDocument = await this.elevadorSchema.findOne(query);
    try {
        elevadorDocument.codigo = elevador.codigo;
        elevadorDocument.edificio = elevador.edificio;
        elevadorDocument.pisos = elevador.pisos;

        await elevadorDocument.save();

        return elevador;
    } catch (err) {
      throw err;
    }
  }

  public async findByCodigo(codigo: string): Promise<Elevador> {
    const query = { codigo: codigo };
    const elevadorRecord = await this.elevadorSchema.findOne(query as FilterQuery<IElevadorPersistence & Document>);
    if (elevadorRecord != null) {
      return ElevadorMap.toDomain(elevadorRecord);
    } else return null;
  }

  public async getAllElevadoresByEdificio(edificio: string): Promise<Elevador[]> {
    const query = { edificio: edificio };

    const listElevadorRecord = await this.elevadorSchema.find(query as FilterQuery<IElevadorPersistence & Document>);
    if (listElevadorRecord != null) {
      return ElevadorMap.toDomainList(listElevadorRecord);
    }
    else
      return null;
  }
}