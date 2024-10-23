import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';

import IElevadorDTO from '../src/dto/IElevadorDTO';
import IElevadorService from '../src/services/IServices/IElevadorService';
import ElevadorController from '../src/controllers/elevadorController';

describe('elevador controller', function () {
	beforeEach(function() {
    });

    it('createElevador: returns elevador created', async function () {
        let body = {
            "id": "ff98bcc6-67e8-4079-a7ee-760862664be0",
            "codigo": "10",
            "edificio": "4",
            "pisos": [
                {"piso": "1"}
            ]
        }
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

        let elevadorSchemaInstance = require("../src/persistence/schemas/elevadorSchema").default;
		Container.set("elevadorSchema", elevadorSchemaInstance);

		let elevadorRepoClass = require("../src/repos/elevadorRepo").default;
		let elevadorRepoInstance = Container.get(elevadorRepoClass);
		Container.set("ElevadorRepo", elevadorRepoInstance);

        let pisoRepoClass = require("../src/repos/pisoRepo").default;
		let pisoRepoInstance = Container.get(pisoRepoClass);
		Container.set("PisoRepo", pisoRepoInstance);

		let elevadorServiceClass = require("../src/services/elevadorService").default;
		let elevadorServiceInstance = Container.get(elevadorServiceClass);
		Container.set("ElevadorService", elevadorServiceInstance);

		elevadorServiceInstance = Container.get("ElevadorService");
		sinon.stub(elevadorServiceInstance, "createElevador").returns( Result.ok<IElevadorDTO>({
            "id": req.body.id,
            "codigo": req.body.codigo,
            "edificio": req.body.edificio,
            "pisos": req.body.pisos
        }));

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

		await ctrl.createElevador(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.pass(res.json, sinon.match({ 
            "id": req.body.id,
            "codigo": req.body.codigo,
            "edificio": req.body.edificio,
            "pisos": req.body.pisos
        }));
	});
});