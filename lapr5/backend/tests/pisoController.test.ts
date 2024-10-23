import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';

import IPisoDTO from '../src/dto/IPisoDTO';
import IPisoService from '../src/services/IServices/IPisoService';
import PisoController from '../src/controllers/pisoController';

describe('piso controller', function () {
	beforeEach(function() {
    });

    it('createPiso: returns piso created', async function () {
        let body = {
            "id": "d123e8d0-b177-43f4-a321-fb62bb7894f6",
            "edificio": "1",
            "piso": "4",
            "descricao": "descricao do piso 4",
            "passagens": [{}],
            "salas": [{}]
        }

        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

        let pisoSchemaInstance = require("../src/persistence/schemas/pisoSchema").default;
		Container.set("pisoSchema", pisoSchemaInstance);

		let pisoRepoClass = require("../src/repos/pisoRepo").default;
		let pisoRepoInstance = Container.get(pisoRepoClass);
		Container.set("PisoRepo", pisoRepoInstance);

        let passagemRepoClass = require("../src/repos/passagemRepo").default;
		let passagemRepoInstance = Container.get(passagemRepoClass);
		Container.set("PassagemRepo", passagemRepoInstance);

		let pisoServiceClass = require("../src/services/pisoService").default;
		let pisoServiceInstance = Container.get(pisoServiceClass);
		Container.set("PisoService", pisoServiceInstance);

		pisoServiceInstance = Container.get("PisoService");
		sinon.stub(pisoServiceInstance, "createPiso").returns( Result.ok<IPisoDTO>({
            "id": req.body.id,
            "edificio": req.body.edificio,
            "piso": req.body.piso,
            "descricao": req.body.descricao,
            "passagens": req.body.passagens,
            "salas": req.body.salas
        }));

		const ctrl = new PisoController(pisoServiceInstance as IPisoService);

		await ctrl.createPiso(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.pass(res.json, sinon.match({ 
            "id": req.body.id,
            "edificio": req.body.edificio,
            "piso": req.body.piso,
            "descricao": req.body.descricao,
            "passagens": req.body.passagens,
            "salas": req.body.salas
        }));
	});
});