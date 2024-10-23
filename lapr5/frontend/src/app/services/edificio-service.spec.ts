import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EdificioDTO } from '../DTO/edificio-dto';

import { EdificioService } from './edificio-service';


describe('EdificioService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let edificioService: EdificioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [EdificioService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    edificioService = TestBed.inject(EdificioService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// EdificioService method tests begin ///
  describe('#getEdificios', () => {
    let expectedEdificios: EdificioDTO[];

    beforeEach(() => {
      edificioService = TestBed.inject(EdificioService);
      expectedEdificios = [{ id: "1", codigo: "asd123", nome: "Edificio 1", descricao: "descricao do edificio 1", pisoMaxSize: "10x10"},
      { id: "2", codigo: "dfg232", nome: "Edificio 2", descricao: "descricao do edificio 2", pisoMaxSize: "3x7"}] as EdificioDTO[];
    });

    it('should return expected edificios (called once)', () => {
      edificioService.getEdificios().subscribe({
        next: edificios => expect(edificios)
          .withContext('should return expected edificios')
          .toEqual(expectedEdificios),
        error: fail
      });

      // EdificioService should have made one request to GET edificios from expected URL
      const req = httpTestingController.expectOne(edificioService.edificioUrl + '/listall');
      expect(req.request.method).toEqual('GET');

      // Respond with the mock edificios
      req.flush(expectedEdificios);
    });

    it('should be OK returning no edificios', () => {
      edificioService.getEdificios().subscribe({
        next: edificios => expect(edificios.length)
          .withContext('should have empty edificios array')
          .toEqual(0),
        error: fail
      });

      const req = httpTestingController.expectOne(edificioService.edificioUrl + '/listall');
      req.flush([]); // Respond with no edificios
    });
  });

  describe('#createEdificios', () => {
    let expectedEdificio: EdificioDTO = { id: "1", codigo: "asd123", nome: "Edificio 1", descricao: "descricao do edificio 1", pisoMaxSize: "10x10"};

    beforeEach(() => {
      edificioService = TestBed.inject(EdificioService);
    });

    it('should return expected created edificios (called once)', () => {
      edificioService.createEdificio("asd123","Edificio 1","descricao do edificio 1","10x10 1").subscribe({
        next: edificios => expect(edificios)
          .withContext('should return expected edificios')
          .toEqual(expectedEdificio),
        error: fail
      });

      // EdificioService should have made one request to POST edificios from expected URL
      const req = httpTestingController.expectOne(edificioService.edificioUrl + '/create');
      expect(req.request.method).toEqual('POST');

      // Respond with the mock edificios
      req.flush(expectedEdificio);
    });
  });

  describe('#updateEdificios', () => {
    let expectedEdificio: EdificioDTO = { id: "1", codigo: "asd123", nome: "Edificio 1", descricao: "descricao do edificio 1", pisoMaxSize: "10x10"};

    beforeEach(() => {
      edificioService = TestBed.inject(EdificioService);
    });

    it('should return expected created edificios (called once)', () => {
      edificioService.updateEdificio("asd123","Edificio 1","descricao do edificio 1","10x10").subscribe({
        next: edificios => expect(edificios)
          .withContext('should return expected edificios')
          .toEqual(expectedEdificio),
        error: fail
      });

      // EdificioService should have made one request to POST edificios from expected URL
      const req = httpTestingController.expectOne(edificioService.edificioUrl + '/edit');
      expect(req.request.method).toEqual('PUT');

      // Respond with the mock edificios
      req.flush(expectedEdificio);
    });
  });

  describe('#getMinMaxEdificios', () => {
    let expectedEdificios: EdificioDTO[];

    beforeEach(() => {
      edificioService = TestBed.inject(EdificioService);
      expectedEdificios = [{ id: "1", codigo: "asd123", nome: "Edificio 1", descricao: "descricao do edificio 1", pisoMaxSize: "10x10"},
      { id: "2", codigo: "dfg232", nome: "Edificio 2", descricao: "descricao do edificio 2", pisoMaxSize: "3x7"}] as EdificioDTO[];
    });

    it('should return expected edificios (called once)', () => {
      const min = 1;
      const max = 2;
      edificioService.getEdificiosMinMax(min,max).subscribe({
        next: edificios => expect(edificios)
          .withContext('should return expected edificios')
          .toEqual(expectedEdificios),
        error: fail
      });

      // EdificioService should have made one request to GET edificios from expected URL
      const req = httpTestingController.expectOne(edificioService.edificioUrl + "/" + min + "/" + max);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock edificios
      req.flush(expectedEdificios);
    });

    it('should be OK returning no edificios', () => {
      const min = 1;
      const max = 2;
      edificioService.getEdificiosMinMax(min,max).subscribe({
        next: edificios => expect(edificios.length)
          .withContext('should have empty edificios array')
          .toEqual(0),
        error: fail
      });

      const req = httpTestingController.expectOne(edificioService.edificioUrl + "/" + min + "/" + max);
      req.flush([]); // Respond with no edificios
    });
  });
});
