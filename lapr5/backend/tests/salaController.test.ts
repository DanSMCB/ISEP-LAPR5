import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';

import ISalaDTO from '../src/dto/ISalaDTO';
import ISalaService from '../src/services/IServices/ISalaService';
import SalaController from '../src/controllers/salaController';

describe('sala controller', function () {
	beforeEach(function() {
    });

    it('createSala: returns sala created', async function () {
        let body = {
            "id": "ca2da3a3-9394-410c-a85f-3a7259792721",
            "nome": "sala 4",
            "descricao": "descrição",
            "categoria": "anfiteatro",
            "tamanho": "20",
            "edificio": "3",
            "piso": "1"
        }

        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

        let salaSchemaInstance = require("../src/persistence/schemas/salaSchema").default;
		Container.set("salaSchema", salaSchemaInstance);

		let salaRepoClass = require("../src/repos/salaRepo").default;
		let salaRepoInstance = Container.get(salaRepoClass);
		Container.set("SalaRepo", salaRepoInstance);

		let salaServiceClass = require("../src/services/salaService").default;
		let salaServiceInstance = Container.get(salaServiceClass);
		Container.set("SalaService", salaServiceInstance);

		salaServiceInstance = Container.get("SalaService");
		sinon.stub(salaServiceInstance, "createSala").returns( Result.ok<ISalaDTO>({
            "id": req.body.id,
            "nome": req.body.nome,
            "descricao": req.body.descricao,
            "categoria": req.body.categoria,
            "tamanho": req.body.tamanho,
            "edificio": req.body.edificio,
            "piso": req.body.piso,
        }));

		const ctrl = new SalaController(salaServiceInstance as ISalaService);

		await ctrl.createSala(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.pass(res.json, sinon.match({ 
            "id": req.body.id,
            "nome": req.body.nome,
            "descricao": req.body.descricao,
            "categoria": req.body.categoria,
            "tamanho": req.body.tamanho,
            "edificio": req.body.edificio,
            "piso": req.body.piso,
        }));
	});
});