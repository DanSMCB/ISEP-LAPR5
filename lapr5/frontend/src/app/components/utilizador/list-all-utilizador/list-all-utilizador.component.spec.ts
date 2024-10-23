import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { ListAllUtilizadorComponent } from './list-all-utilizador.component';
import { UtilizadorService } from '../../../services/utilizador-service';
import { UtilizadorDTO } from '../../../DTO/utilizador-dto';

describe('ListAllUtilizadorComponent', () => {
  let component: ListAllUtilizadorComponent;
  let fixture: ComponentFixture<ListAllUtilizadorComponent>;
  let utilizadorService: UtilizadorService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAllUtilizadorComponent],
      providers: [
        UtilizadorService,
        { provide: Location, useValue: {} },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllUtilizadorComponent);
    component = fixture.componentInstance;
    utilizadorService = TestBed.inject(UtilizadorService);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  // Teste Unitário de Inicialização do Componente: Verifica se a instância do componente é criada com sucesso.
  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  // Teste Unitário: Verifica se o método getUtilizadores é chamado corretamente.
  it('deve obter utilizadores', () => {
    const utilizadoresDTO: UtilizadorDTO[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'user',
        phone: '123456789',
        taxpayer: '123456789',
        state: 'approved',
      },
    ];

    spyOn(utilizadorService, 'getUtilizadores').and.returnValue(of(utilizadoresDTO));

    // Chama o método do componente que obtém utilizadores
    component.getUtilizadores();

    // Garante que o método getUtilizadores é chamado
    expect(utilizadorService.getUtilizadores).toHaveBeenCalled();

    // Garante que os utilizadores são atribuídos corretamente à lista local
    expect(component.utilizadores.length).toBe(utilizadoresDTO.length);
    expect(component.utilizadores).toEqual(utilizadoresDTO);
  });

  // Teste Unitário: Verifica se o método nextPage funciona corretamente.
  it('deve avançar para a próxima página', () => {
    spyOn(component, 'getPaginatedUtilizadores').and.callThrough();
    component.nextPage();
    expect(component.currentPage).toBe(2); // Supondo que você configurou os dados de teste adequadamente
    expect(component.getPaginatedUtilizadores).toHaveBeenCalled();
  });

  // Teste Unitário: Verifica se o método prevPage funciona corretamente.
  it('deve voltar para a página anterior', () => {
    spyOn(component, 'getPaginatedUtilizadores').and.callThrough();
    component.prevPage();
    expect(component.currentPage).toBe(1); // Supondo que você configurou os dados de teste adequadamente
    expect(component.getPaginatedUtilizadores).toHaveBeenCalled();
  });

  // Teste Unitário: Verifica se o método goBack funciona corretamente.
  it('deve voltar', () => {
    spyOn(location, 'back').and.callThrough();
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});
