import { Service, Inject } from 'typedi';

import ITipoDeRobotRepo from "../services/IRepos/ITipoDeRobotRepo";
import { TipoDeRobot } from "../domain/tipoDeRobot";
import { TipoDeRobotMap } from "../mappers/TipoDeRobotMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { ITipoDeRobotPersistence } from '../dataschema/ITipoDeRobotPersistence';

@Service()
export default class TipoDeRobotRepo implements ITipoDeRobotRepo {
  private models: any;

  constructor(
    @Inject('tipoDeRobotSchema') private tipoDeRobotSchema : Model<ITipoDeRobotPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(tipoDeRobot: TipoDeRobot): Promise<boolean> {
    const query = { domainId: tipoDeRobot.id.toString() };
    const tipoDeRobotDocument = await this.tipoDeRobotSchema.findOne(query);

    return !!tipoDeRobotDocument === true;
  }

  public async create (tipoDeRobot: TipoDeRobot): Promise<TipoDeRobot> {
    const query = { domainId: tipoDeRobot.id.toString() }; 

    const tipoDeRobotDocument = await this.tipoDeRobotSchema.findOne(query);

    try {
      if (tipoDeRobotDocument === null) {
        const rawTipoDeRobot: any = TipoDeRobotMap.toPersistence(tipoDeRobot);

        const tipoDeRobotCreated = await this.tipoDeRobotSchema.create(rawTipoDeRobot);

        return TipoDeRobotMap.toDomain(tipoDeRobotCreated);
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  public async save (tipoDeRobot: TipoDeRobot): Promise<TipoDeRobot> {
    const query = { domainId: tipoDeRobot.id.toString()}; 

    const roleDocument = await this.tipoDeRobotSchema.findOne( query );

    try {
      if (roleDocument === null ) {
        const rawRole: any = TipoDeRobotMap.toPersistence(tipoDeRobot);

        const roleCreated = await this.tipoDeRobotSchema.create(rawRole);

        return TipoDeRobotMap.toDomain(roleCreated);
      } else {
        roleDocument.descricao = tipoDeRobot.descricao;
        await roleDocument.save();

        return tipoDeRobot;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(tipoDeRobotId: string): Promise<TipoDeRobot> {
    const query = { domainId: tipoDeRobotId };
    const tipoDeRobotRecord = await this.tipoDeRobotSchema.findOne(query);

    if (tipoDeRobotRecord != null) {
      return TipoDeRobotMap.toDomain(tipoDeRobotRecord);
    } else {
      return null;
    }
  }

  public async getAll(): Promise<TipoDeRobot[]> {
    const query = {};
    const listTipoDeRobotRecord = await this.tipoDeRobotSchema.find(query);
    if (listTipoDeRobotRecord != null) {
     return TipoDeRobotMap.toDomainList(listTipoDeRobotRecord);
    }
    else
      return null;
  }
}