import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TipoDeRobotDTO } from '../DTO/tipo-de-robot-dto';

import { TipoDeRobotService } from './tipo-de-robot-service';

describe('TipoDeRobotService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let tipoDeRobotService: TipoDeRobotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [TipoDeRobotService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    tipoDeRobotService = TestBed.inject(TipoDeRobotService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// TipoDeRobotService method tests begin ///
  describe('#createTipoDeRobots', () => {
    let expectedTipoDeRobot: TipoDeRobotDTO = { id: "1", descricao: "robisep", tarefas: [{ tarefa: "1"}]};

    beforeEach(() => {
      tipoDeRobotService = TestBed.inject(TipoDeRobotService);
    });

    it('should return expected created tipoDeRobotes (called once)', () => {
      const tarefas: { tarefa: string}[] = [
        { tarefa: "1"}
      ];
      tipoDeRobotService.createTipoDeRobot("robisep",tarefas).subscribe({
        next: tipoDeRobots => expect(tipoDeRobots)
          .withContext('should return expected tipoDeRobots')
          .toEqual(expectedTipoDeRobot),
        error: fail
      });

      // TipoDeRobotService should have made one request to POST tipoDeRobots from expected URL
      const req = httpTestingController.expectOne(tipoDeRobotService.tipoDeRobotUrl + '/create');
      expect(req.request.method).toEqual('POST');

      // Respond with the mock tipoDeRobots
      req.flush(expectedTipoDeRobot);
    });
  });
});
