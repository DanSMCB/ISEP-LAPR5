import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';

import IRobotDTO from '../src/dto/IRobotDTO';
import IRobotService from '../src/services/IServices/IRobotService';
import RobotController from '../src/controllers/robotController';

describe('robot controller', function () {
	beforeEach(function() {
    });

    it('createRobot: returns robot created', async function () {
        let body = {
            "id": "04d61181-ce01-402a-b640-b185e2ce4c47",
            "numeroSerie": "123456",
            "codigo": "der123",
            "nickname": "robot 3",
            "marca": "robo corp",
            "estado": "desinibido",
            "tipoDeRobot": "robisep"
        }

        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

        let robotSchemaInstance = require("../src/persistence/schemas/robotSchema").default;
		Container.set("robotSchema", robotSchemaInstance);

		let robotRepoClass = require("../src/repos/robotRepo").default;
		let robotRepoInstance = Container.get(robotRepoClass);
		Container.set("RobotRepo", robotRepoInstance);

		let robotServiceClass = require("../src/services/robotService").default;
		let robotServiceInstance = Container.get(robotServiceClass);
		Container.set("RobotService", robotServiceInstance);

		robotServiceInstance = Container.get("RobotService");
		sinon.stub(robotServiceInstance, "createRobot").returns( Result.ok<IRobotDTO>({
            "id": req.body.id,
            "numeroSerie": req.body.numeroSerie,
            "codigo": req.body.codigo,
            "nickname": req.body.nickname,
            "marca": req.body.marca,
            "estado": req.body.estado,
            "tipoDeRobot": req.body.tipoDeRobot,
        }));

		const ctrl = new RobotController(robotServiceInstance as IRobotService);

		await ctrl.createRobot(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.pass(res.json, sinon.match({ 
            "id": req.body.id,
            "numeroSerie": req.body.numeroSerie,
            "codigo": req.body.codigo,
            "nickname": req.body.nickname,
            "marca": req.body.marca,
            "estado": req.body.estado,
            "tipoDeRobot": req.body.tipoDeRobot,
        }));
	});
});