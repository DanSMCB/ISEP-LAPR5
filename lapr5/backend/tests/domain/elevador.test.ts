import 'reflect-metadata';

import * as sinon from 'sinon';
import { Elevador } from '../../src/domain/elevador';

describe('elevador test', function () {
	beforeEach(function() {
    });

    it('successful creation test', async function () {
       
        let data = {
            "id": "ff98bcc6-67e8-4079-a7ee-760862664be0",
            "codigo": "10",
            "edificio": "4",
            "pisos": [
                {"piso": "1"}
            ]
        }
        
        const elevador1 = Elevador.create(data);

        sinon.assert.match(elevador1,data);
	});
});