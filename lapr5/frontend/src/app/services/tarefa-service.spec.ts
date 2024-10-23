import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TarefaService } from './tarefa-service';
import { TarefaDTO } from '../DTO/tarefa-dto';

describe('TarefaService', () => {
  let service: TarefaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TarefaService]
    });
    service = TestBed.inject(TarefaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Desligar o servidor de teste após todos os testes de integração
  afterEach(() => {
    httpMock.verify();
  });

  // Teste de serviço: Verifica se o serviço foi criado com sucesso.
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Teste de integração de unidade: Verifica se o método getTarefas retorna dados fictícios.
  it('should get tasks', () => {
    const mockTarefas: TarefaDTO[] = [
      {
        id: '1',
        codigo: 'COD1',
        descricao: 'Tarefa 1',
        robot: 'Robot1',
        tipoDeRobot: 'TipoRobot1',
        estado: 'Pendente',
        contactoRequisitante: 'Contato1',
        tipoDeTarefa: 'Vigilancia',
        contactoIncidente: 'ContatoIncidente1',
        edificio: 'Edificio1',
        pisos: [{ piso: 'Piso1' }, { piso: 'Piso2' }],
        salaRecolha: '',
        salaEntrega: '',
        contactoRecolha: '',
        contactoEntrega: ''
      },
      {
        id: '2',
        codigo: 'COD2',
        descricao: 'Tarefa 2',
        robot: 'Robot2',
        tipoDeRobot: 'TipoRobot2',
        estado: 'Concluida',
        contactoRequisitante: 'Contato2',
        tipoDeTarefa: 'EntregaObjetos',
        contactoIncidente: '',
        edificio: '',
        pisos: [],
        salaRecolha: 'SalaRecolha2',
        salaEntrega: 'SalaEntrega2',
        contactoRecolha: 'ContatoRecolha2',
        contactoEntrega: 'ContatoEntrega2'
      }
    ];

    service.getTarefas().subscribe(tarefas => {
      expect(tarefas).toEqual(mockTarefas);
    });

    const req = httpMock.expectOne(`${service.tarefaUrl}/listall`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTarefas);
  });

  // Teste de integração de unidade: Verifica se o método getTarefasAindaNaoAprovadas retorna dados fictícios.
  it('should get tasks not approved', () => {
    const mockTarefasNaoAprovadas: TarefaDTO[] = [
      {
        id: '3',
        codigo: 'COD3',
        descricao: 'Tarefa 3',
        robot: 'Robot3',
        tipoDeRobot: 'TipoRobot3',
        estado: 'Pendente',
        contactoRequisitante: 'Contato3',
        tipoDeTarefa: 'Vigilancia',
        contactoIncidente: 'ContatoIncidente3',
        edificio: 'Edificio3',
        pisos: [{ piso: 'Piso3' }],
        salaRecolha: '',
        salaEntrega: '',
        contactoRecolha: '',
        contactoEntrega: ''
      },
      {
        id: '4',
        codigo: 'COD4',
        descricao: 'Tarefa 4',
        robot: 'Robot4',
        tipoDeRobot: 'TipoRobot4',
        estado: 'Pendente',
        contactoRequisitante: 'Contato4',
        tipoDeTarefa: 'EntregaObjetos',
        contactoIncidente: '',
        edificio: '',
        pisos: [],
        salaRecolha: 'SalaRecolha4',
        salaEntrega: 'SalaEntrega4',
        contactoRecolha: 'ContatoRecolha4',
        contactoEntrega: 'ContatoEntrega4'
      }
    ];

    service.getTarefasAindaNaoAprovadas().subscribe(tarefas => {
      expect(tarefas).toEqual(mockTarefasNaoAprovadas);
    });

    const req = httpMock.expectOne(`${service.tarefaUrl}/listallNaoAprovada`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTarefasNaoAprovadas);
  });

  // Teste de integração de unidade: Verifica se o método createTarefa cria uma tarefa com sucesso.
  it('should create task', () => {
    const mockNovaTarefa: TarefaDTO = {
      id: '5',
      codigo: 'COD5',
      descricao: 'Nova Tarefa',
      robot: 'Robot5',
      tipoDeRobot: 'TipoRobot5',
      estado: 'Pendente',
      contactoRequisitante: 'Contato5',
      tipoDeTarefa: 'Vigilancia',
      contactoIncidente: 'ContatoIncidente5',
      edificio: 'Edificio5',
      pisos: [{ piso: 'Piso5' }],
      salaRecolha: '',
      salaEntrega: '',
      contactoRecolha: '',
      contactoEntrega: ''
    };

    service.createTarefa('5', 'COD3', 'Nova Tarefa', 'Robot1', 'TipoRobot1', 'Pendente', 'Contato1', 'Vigilancia', 'ContatoIncidente1', [], '', '', '', '').subscribe(tarefa => {
      expect(tarefa).toEqual(mockNovaTarefa);
    });

    const req = httpMock.expectOne(`${service.tarefaUrl}/create`);
    expect(req.request.method).toBe('POST');
    req.flush(mockNovaTarefa);
  });

  // Teste de integração de unidade: Verifica se o método updateEstadoDaTarefa atualiza o estado de uma tarefa com sucesso.
  it('should update task state', () => {
    const mockTarefaAtualizada: TarefaDTO = {
      id: '1',
      codigo: 'COD1',
      descricao: 'Tarefa Atualizada',
      robot: 'Robot1',
      tipoDeRobot: 'TipoRobot1',
      estado: 'Concluida',
      contactoRequisitante: 'Contato1',
      tipoDeTarefa: 'Vigilancia',
      contactoIncidente: 'ContatoIncidente1',
      edificio: 'Edificio1',
      pisos: [{ piso: 'Piso1' }, { piso: 'Piso2' }],
      salaRecolha: '',
      salaEntrega: '',
      contactoRecolha: '',
      contactoEntrega: ''
    };

    service.updateEstadoDaTarefa('COD1', 'Concluida').subscribe(tarefa => {
      expect(tarefa).toEqual(mockTarefaAtualizada);
    });

    const req = httpMock.expectOne(`${service.tarefaUrl}/updateEstadoDaTarefa`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockTarefaAtualizada);
  });
});
