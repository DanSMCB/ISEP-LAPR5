import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PisoDTO } from '../DTO/piso-dto';

import { PisoService } from './piso-service';

describe('PisoService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let pisoService: PisoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [PisoService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    pisoService = TestBed.inject(PisoService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// PisoService method tests begin ///
  describe('#getPisos', () => {
    let expectedPisos: PisoDTO[];

    beforeEach(() => {
      pisoService = TestBed.inject(PisoService);
      expectedPisos = [{ id: "1", edificio: "1", piso: "1", descricao: "descricao", passagens: [{passagem: "1"}], salas: [{sala: "1"}]},
      { id: "1", edificio: "1", piso: "1", descricao: "descricao", passagens: [{passagem: "1"}], salas: [{sala: "1"}]}] as PisoDTO[];
    });

    it('should return expected passagens (called once)', () => {
      const idEdificio = "1";
      pisoService.getAllPisosByEdificio(idEdificio).subscribe({
        next: passagens => expect(passagens)
          .withContext('should return expected passagens')
          .toEqual(expectedPisos),
        error: fail
      });

      // PisoService should have made one request to GET passagens from expected URL
      const req = httpTestingController.expectOne(pisoService.pisoUrl + "/" + idEdificio);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock passagens
      req.flush(expectedPisos);
    });

    it('should be OK returning no passagens', () => {
      const idEdificio = "1";
      pisoService.getAllPisosByEdificio(idEdificio).subscribe({
        next: pisos => expect(pisos.length)
          .withContext('should have empty passagens array')
          .toEqual(0),
        error: fail
      });

      const req = httpTestingController.expectOne(pisoService.pisoUrl + "/" + idEdificio);
      req.flush([]); // Respond with no passagens
    });
  });

  describe('#createPisos', () => {
    let expectedPiso: PisoDTO = { id: "1", edificio: "1", piso: "1", descricao: "descricao", passagens: [{passagem: "1"}], salas: [{sala: "1"}]};

    beforeEach(() => {
      pisoService = TestBed.inject(PisoService);
    });

    it('should return expected created pisoes (called once)', () => {
      pisoService.createPiso("1","1","descricao").subscribe({
        next: pisos => expect(pisos)
          .withContext('should return expected passagens')
          .toEqual(expectedPiso),
        error: fail
      });

      // PisoService should have made one request to POST passagens from expected URL
      const req = httpTestingController.expectOne(pisoService.pisoUrl + '/create');
      expect(req.request.method).toEqual('POST');

      // Respond with the mock passagens
      req.flush(expectedPiso);
    });
  });

  describe('#updatePisos', () => {
    let expectedPiso: PisoDTO = { id: "1", edificio: "1", piso: "1", descricao: "descricao", passagens: [{passagem: "1"}], salas: [{sala: "1"}]};

    beforeEach(() => {
      pisoService = TestBed.inject(PisoService);
    });

    it('should return expected created pisoes (called once)', () => {
      pisoService.updatePiso("1","1","descricao").subscribe({
        next: pisos => expect(pisos)
          .withContext('should return expected passagens')
          .toEqual(expectedPiso),
        error: fail
      });

      // PisoService should have made one request to POST passagens from expected URL
      const req = httpTestingController.expectOne(pisoService.pisoUrl + '/edit');
      expect(req.request.method).toEqual('PUT');

      // Respond with the mock passagens
      req.flush(expectedPiso);
    });
  });

  describe('#getPisosWithConnection', () => {
    let expectedPisos: PisoDTO[];

    beforeEach(() => {
      pisoService = TestBed.inject(PisoService);
      expectedPisos = [{ id: "1", edificio: "1", piso: "1", descricao: "descricao", passagens: [{passagem: "1"}], salas: [{sala: "1"}]},
      { id: "1", edificio: "1", piso: "1", descricao: "descricao", passagens: [{passagem: "1"}], salas: [{sala: "1"}]}] as PisoDTO[];
    });

    it('should return expected passagens (called once)', () => {
      pisoService.getPisosWithConnection().subscribe({
        next: pisos => expect(pisos)
          .withContext('should return expected passagens')
          .toEqual(expectedPisos),
        error: fail
      });

      // PisoService should have made one request to GET passagens from expected URL
      const req = httpTestingController.expectOne(pisoService.pisoUrl + "/listwithconnection");
      expect(req.request.method).toEqual('GET');

      // Respond with the mock passagens
      req.flush(expectedPisos);
    });

    it('should be OK returning no passagens', () => {
      pisoService.getPisosWithConnection().subscribe({
        next: pisos => expect(pisos.length)
          .withContext('should have empty passagens array')
          .toEqual(0),
        error: fail
      });

      const req = httpTestingController.expectOne(pisoService.pisoUrl + "/listwithconnection");
      req.flush([]); // Respond with no passagens
    });
  });
});
