import 'reflect-metadata';

import * as sinon from 'sinon';
import { Edificio } from '../../src/domain/edificio';

describe('edificio test', function () {
	beforeEach(function() {
    });

    it('successful creation test', async function () {
       
        let data = {
            "id": "a7a87d26-6582-43d6-9b3d-fb0a314941da",
            "codigo": "10",
            "nome": "edificio 10",
            "descricao": "descricao do edificio 10",
            "pisoMaxSize": "5x5"
        };
        
        const edificio1 = Edificio.create(data);

        sinon.assert.match(edificio1,data);
	});
});