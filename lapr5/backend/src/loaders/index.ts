import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import Logger from "./logger";

import config from "../../config";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  const userSchema = {
    // compare with the approach followed in repos and services
    name: "userSchema",
    schema: "../persistence/schemas/userSchema"
  };
  const roleSchema = {
    // compare with the approach followed in repos and services
    name: "roleSchema",
    schema: "../persistence/schemas/roleSchema"
  };
  const pisoSchema = {
    // compare with the approach followed in repos and services
    name: "pisoSchema",
    schema: "../persistence/schemas/pisoSchema"
  };
  const edificioSchema = {
    // compare with the approach followed in repos and services
    name: "edificioSchema",
    schema: "../persistence/schemas/edificioSchema"
  };
  const elevadorSchema = {
    // compare with the approach followed in repos and services
    name: "elevadorSchema",
    schema: "../persistence/schemas/elevadorSchema"
  };
  const passagemSchema = {
    // compare with the approach followed in repos and services
    name: "passagemSchema",
    schema: "../persistence/schemas/passagemSchema"
  };
  const tipoDeRobotSchema = {
    // compare with the approach followed in repos and services
    name: "tipoDeRobotSchema",
    schema: "../persistence/schemas/tipoDeRobotSchema"
  };
  const salaSchema = {
    // compare with the approach followed in repos and services
    name: "salaSchema",
    schema: "../persistence/schemas/salaSchema"
  };
  const robotSchema = {
    // compare with the approach followed in repos and services
    name: "robotSchema",
    schema: "../persistence/schemas/robotSchema"
  };
  const tarefaSchema = {
    // compare with the approach followed in repos and services
    name: "tarefaSchema",
    schema: "../persistence/schemas/tarefaSchema"
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  };

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  };

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  };

  const pisoController = {
    name: config.controllers.piso.name,
    path: config.controllers.piso.path
  };

  const pisoRepo = {
    name: config.repos.piso.name,
    path: config.repos.piso.path
  };

  const pisoService = {
    name: config.services.piso.name,
    path: config.services.piso.path
  };

  const edificioController = {
    name: config.controllers.edificio.name,
    path: config.controllers.edificio.path
  };

  const edificioRepo = {
    name: config.repos.edificio.name,
    path: config.repos.edificio.path
  };

  const edificioService = {
    name: config.services.edificio.name,
    path: config.services.edificio.path
  };

  const elevadorController = {
    name: config.controllers.elevador.name,
    path: config.controllers.elevador.path
  };

  const elevadorRepo = {
    name: config.repos.elevador.name,
    path: config.repos.elevador.path
  };

  const elevadorService = {
    name: config.services.elevador.name,
    path: config.services.elevador.path
  };
  const robotController = {
    name: config.controllers.robot.name,
    path: config.controllers.robot.path
  };

  const robotRepo = {
    name: config.repos.robot.name,
    path: config.repos.robot.path
  };

  const robotService = {
    name: config.services.robot.name,
    path: config.services.robot.path
  };

  const passagemController = {
    name: config.controllers.passagem.name,
    path: config.controllers.passagem.path
  };

  const passagemRepo = {
    name: config.repos.passagem.name,
    path: config.repos.passagem.path
  };

  const passagemService = {
    name: config.services.passagem.name,
    path: config.services.passagem.path
  };

  const tipoDeRobotController = {
    name: config.controllers.tipoDeRobot.name,
    path: config.controllers.tipoDeRobot.path
  };

  const tipoDeRobotRepo = {
    name: config.repos.tipoDeRobot.name,
    path: config.repos.tipoDeRobot.path
  };

  const tipoDeRobotService = {
    name: config.services.tipoDeRobot.name,
    path: config.services.tipoDeRobot.path
  };

  const salaController = {
    name: config.controllers.sala.name,
    path: config.controllers.sala.path
  };

  const salaRepo = {
    name: config.repos.sala.name,
    path: config.repos.sala.path
  };

  const salaService = {
    name: config.services.sala.name,
    path: config.services.sala.path
  };

  const tarefaController = {
    name: config.controllers.tarefa.name,
    path: config.controllers.tarefa.path
  };

  const tarefaRepo = {
    name: config.repos.tarefa.name,
    path: config.repos.tarefa.path
  };

  const tarefaService = {
    name: config.services.tarefa.name,
    path: config.services.tarefa.path
  };

  const userController = {
    name: config.controllers.user.name,
    path: config.controllers.user.path
  };

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  };

  const userService = {
    name: config.services.user.name,
    path: config.services.user.path
  };

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      pisoSchema,
      edificioSchema,
      elevadorSchema,
      passagemSchema,
      tipoDeRobotSchema,
      salaSchema,
      robotSchema,
      tarefaSchema
    ],
    controllers: [
      userController,
      roleController,
      pisoController,
      edificioController,
      elevadorController,
      tipoDeRobotController,
      salaController,
      robotController,
      passagemController,
      tarefaController,
      userController
    ],
    repos: [
      userRepo,
      roleRepo,
      userRepo,
      pisoRepo,
      edificioRepo,
      elevadorRepo,
      tipoDeRobotRepo,
      salaRepo,
      robotRepo,
      passagemRepo,
      tarefaRepo,
    ],
    services: [
      userService,
      roleService,
      pisoService,
      edificioService,
      elevadorService,
      tipoDeRobotService,
      salaService,
      robotService,
      passagemService,
      tarefaService,
      userService
    ]
  });
  Logger.info("✌️ Schemas, Controllers, Repositories, Services, etc. loaded");

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
