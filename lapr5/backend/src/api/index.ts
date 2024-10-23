import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';

import piso from './routes/pisoRoute';
import elevador from './routes/elevadorRoute';
import tipoDeRobot from './routes/tipoDeRobotRoute';
import edificio from './routes/edificioRoute';
import sala from './routes/salaRoute';
import robot from './routes/robotRoute';
import passagem from './routes/passagemRoute';
import tarefa from './routes/tarefaRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	edificio(app);
	piso(app);
	elevador(app);
	tipoDeRobot(app);
	sala(app);
	robot(app);
	passagem(app);
	tarefa(app);
	
	return app
}