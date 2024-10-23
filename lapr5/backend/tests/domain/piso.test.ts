import 'reflect-metadata';

import * as sinon from 'sinon';
import { Piso } from '../../src/domain/piso';

describe('piso test', function () {
	beforeEach(function() {
    });

    it('successful creation test', async function () {
       
        let data = {
            "id": "d123e8d0-b177-43f4-a321-fb62bb7894f6",
            "edificio": "1",
            "piso": "4",
            "descricao": "descricao do piso 4",
            "passagens": [{"passagem": "1"}],
            "salas": [{"sala": "1"}]
        }
        
        const piso1 = Piso.create(data);

        sinon.assert.match(piso1,data);
	});
});