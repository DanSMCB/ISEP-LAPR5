import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CreateTarefaComponent } from './create-tarefa.component';
import { TarefaService } from '../../../services/tarefa-service';
import { RobotService } from '../../../services/robot-service';
import { EdificioService } from '../../../services/edificio-service';
import { PisoService } from '../../../services/piso-service';
import { SalaService } from '../../../services/sala-service';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';

import { of } from 'rxjs';

describe('CreateTarefaComponent', () => {
  let component: CreateTarefaComponent;
  let fixture: ComponentFixture<CreateTarefaComponent>;
  let robotService: RobotService;
  let edificioService: EdificioService;
  let salaService: SalaService;
  let pisoService: PisoService;
  let tarefaService: TarefaService;
  let location: SpyLocation;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTarefaComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        TarefaService, 
        RobotService, 
        EdificioService, 
        PisoService, 
        SalaService, 
        { provide: Location, useClass: SpyLocation as any },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTarefaComponent);
    component = fixture.componentInstance;
    robotService = TestBed.inject(RobotService);
    edificioService = TestBed.inject(EdificioService);
    salaService = TestBed.inject(SalaService);
    pisoService = TestBed.inject(PisoService);
    tarefaService = TestBed.inject(TarefaService);
    location = TestBed.inject(Location) as SpyLocation;
    fixture.detectChanges();
  });

  // Teste Unitário: Verifica se a instância do componente é criada com sucesso.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Teste Unitário: Verifica se o método getRobots é chamado corretamente.
  it('should get robots', () => {
    spyOn(robotService, 'getRobots').and.callThrough();
    component.getRobots();
    expect(robotService.getRobots).toHaveBeenCalled();
  });

  // Teste Unitário: Verifica se o método getEdificios é chamado corretamente.
  it('should get edificios', () => {
    spyOn(edificioService, 'getEdificios').and.callThrough();
    component.getEdificios();
    expect(edificioService.getEdificios).toHaveBeenCalled();
  });

  // Teste Unitário: Verifica se o método getSalas é chamado corretamente.
  it('should get salas', () => {
    spyOn(salaService, 'getSalas').and.callThrough();
    component.getSalas();
    expect(salaService.getSalas).toHaveBeenCalled();
  });

  // Teste Unitário: Verifica se o método getAllPisosByEdificio interage corretamente com o serviço PisoService.
  it('should get all pisos by edificio', () => {
    spyOn(pisoService, 'getAllPisosByEdificio').and.callThrough();
    const edificio = 'edificio1';
    component.getAllPisosByEdificio(edificio);
    expect(pisoService.getAllPisosByEdificio).toHaveBeenCalledWith(edificio);
  });

  // Teste Unitário: Verifica se o método onEdificioChange funciona corretamente.
  it('should handle edificio change', () => {
    spyOn(component, 'getAllPisosByEdificio').and.callThrough();
    component.tarefaEdificio = 'edificio1';
    component.onEdificioChange();
    expect(component.getAllPisosByEdificio).toHaveBeenCalledWith(component.tarefaEdificio);
  });

  // Teste Unitário: Verifica se o método createTarefa funciona corretamente.
  it('should create tarefa', () => {
    spyOn(robotService, 'getRobot').and.returnValue(of({
      id: '1',
      numeroSerie: '123',
      codigo: 'robotCode',
      nickname: 'robotNickname',
      marca: 'robotMarca',
      estado: 'robotEstado',
      tipoDeRobot: 'tipo1',
    }));
  
    spyOn(tarefaService, 'createTarefa').and.callThrough();
    component.createTarefa(
      "codigo",
      "descricao",
      "robot",
      "contactoRequisitante",
      "tipoDeTarefa",
      "contactoIncidente",
      "edificio",
      "tarefaPisos",
      "salaRecolha",
      "salaIntrega",
      "contactoRecolha",
      "contactoIntrega"
    );
  
    expect(tarefaService.createTarefa).toHaveBeenCalled();
  });

  // Teste Unitário: Verifica se o método parsePisos funciona corretamente.
  it('should parse pisos', () => {
    const pisoString = '1, 2, 3';
    const parsedPisos = component.parsePisos(pisoString);
    expect(parsedPisos).toEqual([{ piso: '1' }, { piso: '2' }, { piso: '3' }]);
  });

  // Teste Unitário: Verifica se o método goBack funciona corretamente.
  it('should go back', () => {
    spyOn(location, 'back').and.callThrough();
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});
