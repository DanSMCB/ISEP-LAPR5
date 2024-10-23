import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RobotDTO } from '../DTO/robot-dto';

import { RobotService } from './robot-service';

describe('RobotService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let robotService: RobotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [RobotService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    robotService = TestBed.inject(RobotService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// RobotService method tests begin ///
  describe('#getRobots', () => {
    let expectedRobots: RobotDTO[];

    beforeEach(() => {
      robotService = TestBed.inject(RobotService);
      expectedRobots = [{ id: "1", numeroSerie: "123456", codigo: "1", nickname: "robot", marca: "robot corp", estado: "inibido", tipoDeRobot: "robisep"},
      { id: "1", numeroSerie: "123456", codigo: "1", nickname: "robot", marca: "robot corp", estado: "inibido", tipoDeRobot: "robisep"}] as RobotDTO[];
    });

    it('should return expected robots (called once)', () => {
      robotService.getRobots().subscribe({
        next: robots => expect(robots)
          .withContext('should return expected robots')
          .toEqual(expectedRobots),
        error: fail
      });

      // RobotService should have made one request to GET robots from expected URL
      const req = httpTestingController.expectOne(robotService.robotUrl + "/listall");
      expect(req.request.method).toEqual('GET');

      // Respond with the mock robots
      req.flush(expectedRobots);
    });

    it('should be OK returning no robots', () => {
      robotService.getRobots().subscribe({
        next: robots => expect(robots.length)
          .withContext('should have empty robots array')
          .toEqual(0),
        error: fail
      });

      const req = httpTestingController.expectOne(robotService.robotUrl + "/listall");
      req.flush([]); // Respond with no robots
    });
  });

  describe('#createRobots', () => {
    let expectedRobot: RobotDTO = { id: "1", numeroSerie: "123456", codigo: "1", nickname: "robot", marca: "robot corp", estado: "inibido", tipoDeRobot: "robisep"};

    beforeEach(() => {
      robotService = TestBed.inject(RobotService);
    });

    it('should return expected created robotes (called once)', () => {
      robotService.createRobot("123456","1","robot","robot corp","inibido","robisep").subscribe({
        next: robots => expect(robots)
          .withContext('should return expected robots')
          .toEqual(expectedRobot),
        error: fail
      });

      // RobotService should have made one request to POST robots from expected URL
      const req = httpTestingController.expectOne(robotService.robotUrl + '/create');
      expect(req.request.method).toEqual('POST');

      // Respond with the mock robots
      req.flush(expectedRobot);
    });
  });

  describe('#inhibitRobots', () => {
    let expectedRobot: RobotDTO = { id: "1", numeroSerie: "123456", codigo: "1", nickname: "robot", marca: "robot corp", estado: "inibido", tipoDeRobot: "robisep"};

    beforeEach(() => {
      robotService = TestBed.inject(RobotService);
    });

    it('should return expected created robotes (called once)', () => {
      robotService.inhibitRobot("123456").subscribe({
        next: robots => expect(robots)
          .withContext('should return expected robots')
          .toEqual(expectedRobot),
        error: fail
      });

      // RobotService should have made one request to POST robots from expected URL
      const req = httpTestingController.expectOne(robotService.robotUrl + '/inhibit');
      expect(req.request.method).toEqual('PATCH');

      // Respond with the mock robots
      req.flush(expectedRobot);
    });
  });
});
