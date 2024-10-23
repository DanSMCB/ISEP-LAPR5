import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ElevadorDTO } from '../DTO/elevador-dto';

import { ElevadorService } from './elevador-service';

describe('ElevadorService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let elevadorService: ElevadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [ElevadorService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    elevadorService = TestBed.inject(ElevadorService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// ElevadorService method tests begin ///
  describe('#getElevadores', () => {
    let expectedElevadors: ElevadorDTO[];

    beforeEach(() => {
      elevadorService = TestBed.inject(ElevadorService);
      expectedElevadors = [{ id: "1", codigo: "123456", edificio: "Elevador 1", pisos: [{ piso: "1"}, { piso: "2"}]},
      { id: "2", codigo: "343345", edificio: "Elevador 2", pisos: [{ piso: "3"}, { piso: "4"}]}] as ElevadorDTO[];
    });

    it('should return expected elevadors (called once)', () => {
      const idEdificio = "1";
      elevadorService.getElevadores(idEdificio).subscribe({
        next: elevadors => expect(elevadors)
          .withContext('should return expected elevadors')
          .toEqual(expectedElevadors),
        error: fail
      });

      // ElevadorService should have made one request to GET elevadors from expected URL
      const req = httpTestingController.expectOne(elevadorService.elevadorUrl + "/" + idEdificio);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock elevadors
      req.flush(expectedElevadors);
    });

    it('should be OK returning no elevadors', () => {
      const idEdificio = "1";
      elevadorService.getElevadores(idEdificio).subscribe({
        next: elevadors => expect(elevadors.length)
          .withContext('should have empty elevadors array')
          .toEqual(0),
        error: fail
      });

      const req = httpTestingController.expectOne(elevadorService.elevadorUrl + "/" + idEdificio);
      req.flush([]); // Respond with no elevadors
    });
  });

  describe('#createElevadores', () => {
    let expectedElevador: ElevadorDTO = { id: "1", codigo: "123456", edificio: "Elevador 1", pisos: [{ piso: "1"}, { piso: "2"}]};

    beforeEach(() => {
      elevadorService = TestBed.inject(ElevadorService);
    });

    it('should return expected created elevadores (called once)', () => {
      const pisos = [{ piso: "1"}, { piso: "2"}];
      elevadorService.createElevador("123456","Elevador 1",pisos).subscribe({
        next: elevadores => expect(elevadores)
          .withContext('should return expected elevadors')
          .toEqual(expectedElevador),
        error: fail
      });

      // ElevadorService should have made one request to POST elevadors from expected URL
      const req = httpTestingController.expectOne(elevadorService.elevadorUrl + '/create');
      expect(req.request.method).toEqual('POST');

      // Respond with the mock elevadors
      req.flush(expectedElevador);
    });
  });

  describe('#updateElevadors', () => {
    let expectedElevador: ElevadorDTO = { id: "1", codigo: "123456", edificio: "Elevador 1", pisos: [{ piso: "1"}, { piso: "2"}]};

    beforeEach(() => {
      elevadorService = TestBed.inject(ElevadorService);
    });

    it('should return expected created elevadors (called once)', () => {
      const pisos = [{ piso: "1"}, { piso: "2"}];
      elevadorService.updateElevador("123456","Elevador 1",pisos).subscribe({
        next: elevadors => expect(elevadors)
          .withContext('should return expected elevadors')
          .toEqual(expectedElevador),
        error: fail
      });

      // ElevadorService should have made one request to POST elevadors from expected URL
      const req = httpTestingController.expectOne(elevadorService.elevadorUrl + '/edit');
      expect(req.request.method).toEqual('PUT');

      // Respond with the mock elevadors
      req.flush(expectedElevador);
    });
  });
});
