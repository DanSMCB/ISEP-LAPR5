import { Service, Inject } from 'typedi';

import IRobotRepo from "../services/IRepos/IRobotRepo";
import { Robot } from "../domain/robot";
import { RobotId } from "../domain/robotId";
import { RobotMap } from "../mappers/RobotMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';

@Service()
export default class RobotRepo implements IRobotRepo {
  private models: any;

  constructor(
    @Inject('robotSchema') private robotSchema : Model<IRobotPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(robot: Robot): Promise<boolean> {

    const idX = robot.id instanceof RobotId ? (<RobotId>robot.id).toValue() : robot.id;

    const query = { id: idX }; 
    const robotDocument = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistence & Document>);

    return !!robotDocument === true;
  }

  public async save (robot: Robot): Promise<Robot> {
    const query = { domainId: robot.id.toString()}; 

    const robotDocument = await this.robotSchema.findOne( query );
  
    try {
      if (robotDocument === null ) {
        const rawRobot: any = RobotMap.toPersistence(robot);

        const robotCreated = await this.robotSchema.create(rawRobot);

        return RobotMap.toDomain(robotCreated);
      } else {
        robotDocument.numeroSerie = robot.numeroSerie;
        robotDocument.codigo = robot.codigo;
        robotDocument.nickname = robot.nickname;
        robotDocument.marca = robot.marca;
        robotDocument.estado = robot.estado;
        robotDocument.tipoDeRobot = robot.tipoDeRobot;

        await robotDocument.save();

        return robot;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByCodigo(codigo:  string): Promise<Robot> {
    
    const query = { numeroSerie:codigo };
    const robotRecord = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistence & Document>);
  
    if (robotRecord) {
      return RobotMap.toDomain(robotRecord);
    } else {
      return null;
    }
  }

  public async getAll(): Promise<Robot[]> {
    const query = {};
    const listRobotRecord = await this.robotSchema.find(query);
    if (listRobotRecord != null) {
     return RobotMap.toDomainList(listRobotRecord);
    }
    else
    return null;
  }
}