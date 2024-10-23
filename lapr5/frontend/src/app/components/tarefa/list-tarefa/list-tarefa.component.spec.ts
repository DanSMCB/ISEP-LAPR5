import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ListTarefaComponent } from './list-tarefa.component';
import { TarefaService } from "../../../services/tarefa-service";
import { Location } from '@angular/common';
import { of } from 'rxjs';

describe('ListTarefaComponent', () => {
  let component: ListTarefaComponent;
  let fixture: ComponentFixture<ListTarefaComponent>;
  let tarefaService: TarefaService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTarefaComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        TarefaService,
        { provide: Location, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListTarefaComponent);
    component = fixture.componentInstance;
    tarefaService = TestBed.inject(TarefaService);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  // Teste Unitário: Verifica se a instância do componente é criada com sucesso.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Teste Unitário: Verifica se o método getTarefasAindaNaoAprovadas é chamado corretamente.
  it('should get tarefas ainda nao aprovadas', () => {
    spyOn(tarefaService, 'getTarefasAindaNaoAprovadas').and.callThrough();
    component.getTarefasAindaNaoAprovadas();
    expect(tarefaService.getTarefasAindaNaoAprovadas).toHaveBeenCalled();
  });

// Teste Unitário: Verifica se o método updateEstadoDaTarefa funciona corretamente.
it('should update estado da tarefa', () => {
  const codigo = 'codigo123';
  const novoEstado = 'novoEstado';
  
  spyOn(tarefaService, 'updateEstadoDaTarefa').and.returnValue(of({
    id: '1',
    codigo: 'codigo123',
    descricao: 'descricao1',
    robot: 'robot1',
    tipoDeRobot: 'tipo1',
    estado: 'estado1',
    contactoRequisitante: 'contato1',
    tipoDeTarefa: 'tipoTarefa1',
    contactoIncidente: 'incidente1',
    edificio: 'edificio1',
    pisos: [{ piso: '1' }, { piso: '2' }],
    salaRecolha: 'salaRecolha1',
    salaEntrega: 'salaEntrega1',
    contactoRecolha: 'contatoRecolha1',
    contactoEntrega: 'contatoEntrega1',
  }));
  spyOn(component, 'getTarefasAindaNaoAprovadas').and.callThrough();
  
  component.updateEstadoDaTarefa(codigo, novoEstado);
  
  expect(tarefaService.updateEstadoDaTarefa).toHaveBeenCalledWith(codigo, novoEstado);
  expect(component.getTarefasAindaNaoAprovadas).toHaveBeenCalled();
});


  // Teste Unitário: Verifica se o método parsePisos funciona corretamente.
  it('should parse pisos', () => {
    const pisos = [{ piso: '1' }, { piso: '2' }, { piso: '3' }];
    const parsedPisos = component.parsePisos(pisos);
    expect(parsedPisos).toEqual('1,2,3');
  });

  // Teste Unitário: Verifica se o método nextPage funciona corretamente.
  it('should navigate to the next page', () => {
    spyOn(component, 'getPaginatedTarefas').and.callThrough();
    component.nextPage();
    expect(component.currentPage).toBe(2); // Assuming you have set up the test data accordingly
    expect(component.getPaginatedTarefas).toHaveBeenCalled();
  });

  // Teste Unitário: Verifica se o método prevPage funciona corretamente.
  it('should navigate to the previous page', () => {
    spyOn(component, 'getPaginatedTarefas').and.callThrough();
    component.prevPage();
    expect(component.currentPage).toBe(1); // Assuming you have set up the test data accordingly
    expect(component.getPaginatedTarefas).toHaveBeenCalled();
  });

  // Teste Unitário: Verifica se o método goBack funciona corretamente.
  it('should go back', () => {
    spyOn(location, 'back').and.callThrough();
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});
