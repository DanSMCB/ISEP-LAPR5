import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';

import IEdificioDTO from '../src/dto/IEdificioDTO';
import IEdificioService from '../src/services/IServices/IEdificioService';
import EdificioController from '../src/controllers/edificioController';

describe('edificio controller', function () {
	beforeEach(function() {
    });

    it('createEdificio: returns edificio created', async function () {
        let body = {
            "id": "a7a87d26-6582-43d6-9b3d-fb0a314941da",
            "codigo": "10",
            "nome": "edificio 10",
            "descricao": "descricao do edificio 10",
            "pisoMaxSize": "5x5"
        };

        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};


        let edificioSchemaInstance = require("../src/persistence/schemas/edificioSchema").default;
		Container.set("edificioSchema", edificioSchemaInstance);

		let edificioRepoClass = require("../src/repos/edificioRepo").default;
		let edificioRepoInstance = Container.get(edificioRepoClass);
		Container.set("EdificioRepo", edificioRepoInstance);

        let pisoRepoClass = require("../src/repos/pisoRepo").default;
		let pisoRepoInstance = Container.get(pisoRepoClass);
		Container.set("PisoRepo", pisoRepoInstance);

		let edificioServiceClass = require("../src/services/edificioService").default;
		let edificioServiceInstance = Container.get(edificioServiceClass);
		Container.set("EdificioService", edificioServiceInstance);

		edificioServiceInstance = Container.get("EdificioService");
		sinon.stub(edificioServiceInstance, "createEdificio").returns( Result.ok<IEdificioDTO>({
            "id": req.body.id,
            "codigo": req.body.codigo,
            "nome": req.body.nome,
            "descricao": req.body.descricao,
            "pisoMaxSize": req.body.pisoMaxSize
        }));

		const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

		await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.pass(res.json, sinon.match({ 
            "id": req.body.id,
            "codigo": req.body.codigo,
            "nome": req.body.nome,
            "descricao": req.body.descricao,
            "pisoMaxSize": req.body.pisoMaxSize
        }));
	});
});