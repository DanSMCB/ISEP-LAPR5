import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';

import IPassagemDTO from '../src/dto/IPassagemDTO';
import IPassagemService from '../src/services/IServices/IPassagemService';
import PassagemController from '../src/controllers/passagemController';

describe('passagem controller', function () {
	beforeEach(function() {
    });

    it('createPassagem: returns passagem created', async function () {
      let body = {
        "id": "da9b340b-34c9-416a-8dc8-195235a8053e",
        "passagemId": "10",
        "connection": [
          {
            "edificio": "1",
            "piso": "3"
          },
          {
            "edificio": "4",
            "piso": "1"
          }
        ]
      }

      let req: Partial<Request> = {};
      req.body = body;

      let res: Partial<Response> = {
        json: sinon.spy()
      };
      let next: Partial<NextFunction> = () => {};

      let passagemSchemaInstance = require("../src/persistence/schemas/passagemSchema").default;
      Container.set("passagemSchema", passagemSchemaInstance);

      let passagemRepoClass = require("../src/repos/passagemRepo").default;
      let passagemRepoInstance = Container.get(passagemRepoClass);
      Container.set("PassagemRepo", passagemRepoInstance);

      let passagemServiceClass = require("../src/services/passagemService").default;
      let passagemServiceInstance = Container.get(passagemServiceClass);
      Container.set("PassagemService", passagemServiceInstance);

      passagemServiceInstance = Container.get("PassagemService");
      sinon.stub(passagemServiceInstance, "createPassagem").returns( Result.ok<IPassagemDTO>({
          "id": req.body.id,
          "passagemId": req.body.passagemId,
          "connection": req.body.connection
      }));

      const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

      await ctrl.createPassagem(<Request>req, <Response>res, <NextFunction>next);

      sinon.assert.pass(res.json, sinon.match({ 
          "id": req.body.id,
          "passagemId": req.body.passagemId,
          "connection": req.body.connection
      }));
	});
});