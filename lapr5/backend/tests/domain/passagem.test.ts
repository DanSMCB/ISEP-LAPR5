import 'reflect-metadata';

import * as sinon from 'sinon';
import { Passagem } from '../../src/domain/passagem';

describe('passagem test', function () {
	beforeEach(function() {
    });

    it('successful creation test', async function () {
       
        let data = {
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
        
        const passagem1 = Passagem.create(data);

        sinon.assert.match(passagem1,data);
	});
});