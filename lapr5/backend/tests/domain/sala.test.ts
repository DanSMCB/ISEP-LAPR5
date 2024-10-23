import 'reflect-metadata';

import * as sinon from 'sinon';
import { Sala } from '../../src/domain/sala';

describe('sala test', function () {
	beforeEach(function() {
    });

    it('successful creation test', async function () {
       
        let data = {
            "id": "ca2da3a3-9394-410c-a85f-3a7259792721",
            "nome": "sala 4",
            "descricao": "descrição",
            "categoria": "anfiteatro",
            "tamanho": "20",
            "edificio": "3",
            "piso": "1"
        }
        
        const sala1 = Sala.create(data);

        sinon.assert.match(sala1,data);
	});
});