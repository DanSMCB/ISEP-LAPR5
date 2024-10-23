import { Service, Inject } from 'typedi';

import IPisoRepo from "../services/IRepos/IPisoRepo";
import { Piso } from "../domain/piso";
import { PisoId } from "../domain/pisoId";
import { PisoMap } from "../mappers/PisoMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPisoPersistence } from '../dataschema/IPisoPersistence';

@Service()
export default class PisoRepo implements IPisoRepo {
  private models: any;

  constructor(
    @Inject('pisoSchema') private pisoSchema : Model<IPisoPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(piso: Piso): Promise<boolean> {
    const idX = piso.id instanceof PisoId ? (<PisoId>piso.id).toValue() : piso.id;

    const query = { id: idX };
    const pisoDocument = await this.pisoSchema.findOne(query as FilterQuery<IPisoPersistence & Document>);

    return !!pisoDocument === true;
  }

  public async create (piso: Piso): Promise<Piso> {
    const query = { edificio: piso.edificio, piso: piso.piso}; 

    const pisoDocument = await this.pisoSchema.findOne(query);

    try {
      if (pisoDocument === null) {
        const rawEdificio: any = PisoMap.toPersistence(piso);

        const pisoCreated = await this.pisoSchema.create(rawEdificio);

        return PisoMap.toDomain(pisoCreated);
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  //  Update Piso
  public async save (piso: Piso): Promise<Piso> {
    const query = { domainId: piso.id.toString()}; 

    const pisoDocument = await this.pisoSchema.findOne(query);
    try {
        pisoDocument.edificio = piso.edificio;
        pisoDocument.piso = piso.piso;
        pisoDocument.descricao = piso.descricao;
        pisoDocument.passagens = piso.passagens;
        pisoDocument.salas = piso.salas;

        await pisoDocument.save();

        return piso;
    } catch (err) {
      throw err;
    }
  }

  public async findByEdificioAndPiso(edificio: string, piso: string): Promise<Piso> {
    const query = { edificio: edificio, piso: piso};
    const pisoRecord = await this.pisoSchema.findOne(query);
    
    if (pisoRecord != null) {
      return PisoMap.toDomain(pisoRecord);
    } else {
      return null;
    }
  }

  public async getAllPisosByEdificio(edificio: string): Promise<Piso[]> {
    const query = { edificio: edificio };

    const listPisoRecord = await this.pisoSchema.find(query as FilterQuery<IPisoPersistence & Document>);
    if (listPisoRecord != null) {
      return PisoMap.toDomainList(listPisoRecord);
    }
    else
      return null;
  }

  public async getPisosWithConnection(): Promise<Piso[]> {
    const query = {
      passagens: { $exists: true, $not: { $size: 0 } }
    };
    const listPisoRecord = await this.pisoSchema.find(query);
    if (listPisoRecord != null) {
      return PisoMap.toDomainList(listPisoRecord);
    }
    else
      return null;
  }

  public async getAll(): Promise<Piso[]> {
    const query = {};
    const listPisoRecord = await this.pisoSchema.find(query);
    if (listPisoRecord != null) {
      return PisoMap.toDomainList(listPisoRecord);
    }
    else
      return null;
  }
}