import 'reflect-metadata';

import * as sinon from 'sinon';
import { TipoDeRobot } from '../../src/domain/tipoDeRobot';

describe('tipoDeRobot test', function () {
	beforeEach(function() {
    });

    it('successful creation test', async function () {
       
        let data = {
            "id": "935719b2-f33e-4310-bd92-8627a94d6be5",
            "descricao": "droneisep",
            "tarefas": [
                {"tarefa": "vigilancia"}
            ]
        }
        
        const tipoDeRobot1 = TipoDeRobot.create(data);

        sinon.assert.match(tipoDeRobot1,data);
	});
});