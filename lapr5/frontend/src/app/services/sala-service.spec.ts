import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SalaDTO } from '../DTO/sala-dto';

import { SalaService } from './sala-service';

describe('SalaService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let salaService: SalaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [SalaService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    salaService = TestBed.inject(SalaService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// SalaService method tests begin ///
  describe('#createSalas', () => {
    let expectedSala: SalaDTO = { id: "1", nome: "sala 1", descricao: "descricao", categoria: "gabinete", tamanho: "10", edificio: "1", piso: "1"};

    beforeEach(() => {
      salaService = TestBed.inject(SalaService);
    });

    it('should return expected created salaes (called once)', () => {
      salaService.createSala("sala 1","descricao","gabinete","10","1","1").subscribe({
        next: salas => expect(salas)
          .withContext('should return expected salas')
          .toEqual(expectedSala),
        error: fail
      });

      // SalaService should have made one request to POST salas from expected URL
      const req = httpTestingController.expectOne(salaService.salaUrl + '/create');
      expect(req.request.method).toEqual('POST');

      // Respond with the mock salas
      req.flush(expectedSala);
    });
  });
});
