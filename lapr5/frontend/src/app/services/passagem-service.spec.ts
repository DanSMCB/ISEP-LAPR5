import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PassagemDTO } from '../DTO/passagem-dto';

import { PassagemService } from './passagem-service';

describe('PassagemService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let passagemService: PassagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [PassagemService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    passagemService = TestBed.inject(PassagemService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// PassagemService method tests begin ///
  describe('#getPassagens', () => {
    let expectedPassagens: PassagemDTO[];

    beforeEach(() => {
      passagemService = TestBed.inject(PassagemService);
      expectedPassagens = [{ id: "1", passagemId: "1", connection: [{edificio: "1", piso: "2"}, {edificio: "2", piso: "1"}]},
      { id: "1", passagemId: "1", connection: [{edificio: "1", piso: "2"}, {edificio: "2", piso: "1"}]}] as PassagemDTO[];
    });

    it('should return expected passagens (called once)', () => {
      const idEdificio1 = "1";
      const idEdificio2 = "2";
      passagemService.listPassagemBetweenEdificios(idEdificio1,idEdificio2).subscribe({
        next: passagens => expect(passagens)
          .withContext('should return expected passagens')
          .toEqual(expectedPassagens),
        error: fail
      });

      // PassagemService should have made one request to GET passagens from expected URL
      const req = httpTestingController.expectOne(passagemService.passagemUrl + "/listbetweenEdificio/" + idEdificio1 + "/" + idEdificio2);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock passagens
      req.flush(expectedPassagens);
    });

    it('should be OK returning no passagens', () => {
      const idEdificio1 = "1";
      const idEdificio2 = "2";
      passagemService.listPassagemBetweenEdificios(idEdificio1, idEdificio2).subscribe({
        next: passagens => expect(passagens.length)
          .withContext('should have empty passagens array')
          .toEqual(0),
        error: fail
      });

      const req = httpTestingController.expectOne(passagemService.passagemUrl + "/listbetweenEdificio/" + idEdificio1 + "/" + idEdificio2);
      req.flush([]); // Respond with no passagens
    });
  });

  describe('#createPassagens', () => {
    let expectedPassagem: PassagemDTO = { id: "1", passagemId: "1", connection: [{edificio: "1", piso: "2"}, {edificio: "2", piso: "1"}]};

    beforeEach(() => {
      passagemService = TestBed.inject(PassagemService);
    });

    it('should return expected created passagemes (called once)', () => {
      const connection: { edificio: string, piso: string }[] = [
        { edificio: "1", piso: "2" },
        { edificio: "2", piso: "1" }
      ];
      passagemService.createPassagem("1",connection).subscribe({
        next: passagens => expect(passagens)
          .withContext('should return expected passagens')
          .toEqual(expectedPassagem),
        error: fail
      });

      // PassagemService should have made one request to POST passagens from expected URL
      const req = httpTestingController.expectOne(passagemService.passagemUrl + '/create');
      expect(req.request.method).toEqual('POST');

      // Respond with the mock passagens
      req.flush(expectedPassagem);
    });
  });

  describe('#updatePassagens', () => {
    let expectedPassagem: PassagemDTO = { id: "1", passagemId: "1", connection: [{edificio: "1", piso: "2"}, {edificio: "2", piso: "1"}]};

    beforeEach(() => {
      passagemService = TestBed.inject(PassagemService);
    });

    it('should return expected created passagemes (called once)', () => {
      const connection: { edificio: string, piso: string }[] = [
        { edificio: "1", piso: "2" },
        { edificio: "2", piso: "1" }
      ];
      passagemService.updatePassagem("1",connection).subscribe({
        next: passagens => expect(passagens)
          .withContext('should return expected passagens')
          .toEqual(expectedPassagem),
        error: fail
      });

      // PassagemService should have made one request to POST passagens from expected URL
      const req = httpTestingController.expectOne(passagemService.passagemUrl + '/create');
      expect(req.request.method).toEqual('PUT');

      // Respond with the mock passagens
      req.flush(expectedPassagem);
    });
  });
});
