import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

process.env.ORGANIZATION_DOMAIN = process.env.ORGANIZATION_DOMAIN || 'isep.ipp.pt';

export default {
  /**
   * Your favorite port : optional change to 4000 by JRT
   */
  port: parseInt(process.env.PORT, 10) || 4000, 

  

  /**
   * That long string from mlab
   */
  //databaseURL: process.env.MONGODB_URI || "mongodb+srv://1201654:123@cluster0.xq7ofjg.mongodb.net/",
  databaseURL: process.env.MONGODB_URI || "mongodb+srv://1201525:mongodb123@cluster0.ll5tvkw.mongodb.net/",
  //databaseURL: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/test",
  //databaseURL: process.env.MONGODB_URI || "mongodb://localhost:27017",
  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    user:{
      name: "UserController",
      path: "../controllers/userController"
    },
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    edificio: {
      name: "EdificioController",
      path: "../controllers/edificioController"
    },
    piso: {
      name: "PisoController",
      path: "../controllers/pisoController"
    },
    elevador: {
      name: "ElevadorController",
      path: "../controllers/elevadorController"
    },
    passagem: {
      name: "PassagemController",
      path: "../controllers/passagemController"
    },
    tipoDeRobot: {
      name: "TipoDeRobotController",
      path: "../controllers/tipoDeRobotController"
    },
    sala: {
      name: "SalaController",
      path: "../controllers/salaController"
    },
    robot: {
      name: "RobotController",
      path: "../controllers/robotController"
    },
    tarefa: {
      name: "TarefaController",
      path: "../controllers/tarefaController"
    }
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    edificio: {
      name: "EdificioRepo",
      path: "../repos/edificioRepo"
    },
    piso: {
      name: "PisoRepo",
      path: "../repos/pisoRepo"
    },
    elevador: {
      name: "ElevadorRepo",
      path: "../repos/elevadorRepo"
    },
    passagem: {
      name: "PassagemRepo",
      path: "../repos/passagemRepo"
    },
    tipoDeRobot: {
      name: "TipoDeRobotRepo",
      path: "../repos/tipoDeRobotRepo"
    },
    sala: {
      name: "SalaRepo",
      path: "../repos/salaRepo"
    },
    robot: {
      name: "RobotRepo",
      path: "../repos/robotRepo"
    },
    tarefa: {
      name: "TarefaRepo",
      path: "../repos/tarefaRepo"
    }
  },

  services: {
    user:{
      name: "UserSerice",
      path: "../services/userService"
    },
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    edificio: {
      name: "EdificioService",
      path: "../services/edificioService"
    },
    piso: {
      name: "PisoService",
      path: "../services/pisoService"
    },
    elevador: {
      name: "ElevadorService",
      path: "../services/elevadorService"
    },
    passagem: {
      name: "PassagemService",
      path: "../services/passagemService"
    },
    tipoDeRobot: {
      name: "TipoDeRobotService",
      path: "../services/tipoDeRobotService"
    },
    sala: {
      name: "SalaService",
      path: "../services/salaService"
    },
    robot: {
      name: "RobotService",
      path: "../services/robotService"
    },
    tarefa: {
      name: "TarefaService",
      path: "../services/tarefaService"
    }
  },
};
