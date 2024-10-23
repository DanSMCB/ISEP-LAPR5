import 'reflect-metadata';

import * as sinon from 'sinon';
import { Robot } from '../../src/domain/robot';

describe('robot test', function () {
	beforeEach(function() {
    });

    it('successful creation test', async function () {
       
        let data = {
            "id": "04d61181-ce01-402a-b640-b185e2ce4c47",
            "numeroSerie": "123456",
            "codigo": "der123",
            "nickname": "robot 3",
            "marca": "robo corp",
            "estado": "desinibido",
            "tipoDeRobot": "robisep"
        }
        
        const robot1 = Robot.create(data);

        sinon.assert.match(robot1,data);
	});
});