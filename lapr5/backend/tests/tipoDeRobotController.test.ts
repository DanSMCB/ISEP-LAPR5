import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';

import ITipoDeRobotDTO from '../src/dto/ITipoDeRobotDTO';
import ITipoDeRobotService from '../src/services/IServices/ITipoDeRobotService';
import TipoDeRobotController from '../src/controllers/tipoDeRobotController';

describe('tipoDeRobot controller', function () {
	beforeEach(function() {
    });

    it('createTipoDeRobot: returns tipoDeRobot created', async function () {
        let body = {
            "id": "935719b2-f33e-4310-bd92-8627a94d6be5",
            "descricao": "droneisep",
            "tarefas": [
                {"tarefa": "vigilancia"}
            ]
        }

        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

        let tipoDeRobotSchemaInstance = require("../src/persistence/schemas/tipoDeRobotSchema").default;
		Container.set("tipoDeRobotSchema", tipoDeRobotSchemaInstance);

		let tipoDeRobotRepoClass = require("../src/repos/tipoDeRobotRepo").default;
		let tipoDeRobotRepoInstance = Container.get(tipoDeRobotRepoClass);
		Container.set("TipoDeRobotRepo", tipoDeRobotRepoInstance);

		let tipoDeRobotServiceClass = require("../src/services/tipoDeRobotService").default;
		let tipoDeRobotServiceInstance = Container.get(tipoDeRobotServiceClass);
		Container.set("TipoDeRobotService", tipoDeRobotServiceInstance);

		tipoDeRobotServiceInstance = Container.get("TipoDeRobotService");
		sinon.stub(tipoDeRobotServiceInstance, "createTipoDeRobot").returns( Result.ok<ITipoDeRobotDTO>({
            "id": req.body.id,
            "descricao": req.body.descricao,
            "tarefas": req.body.tarefas
        }));

		const ctrl = new TipoDeRobotController(tipoDeRobotServiceInstance as ITipoDeRobotService);

		await ctrl.createTipoDeRobot(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.pass(res.json, sinon.match({ 
            "id": req.body.id,
            "descricao": req.body.descricao,
            "tarefas": req.body.tarefas
        }));
	});
});