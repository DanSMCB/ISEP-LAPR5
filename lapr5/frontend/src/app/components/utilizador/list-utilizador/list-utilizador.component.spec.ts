import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { ListUtilizadorComponent } from './list-utilizador.component';
import { UtilizadorService } from '../../../services/utilizador-service';
import { UtilizadorDTO } from '../../../DTO/utilizador-dto';

describe('ListUtilizadorComponent', () => {
  let component: ListUtilizadorComponent;
  let fixture: ComponentFixture<ListUtilizadorComponent>;
  let utilizadorService: UtilizadorService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUtilizadorComponent],
      providers: [
        UtilizadorService,
        { provide: Location, useValue: {} },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUtilizadorComponent);
    component = fixture.componentInstance;
    utilizadorService = TestBed.inject(UtilizadorService);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  // Teste Unitário: Verifica se a instância do componente é criada com sucesso.
  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  // Teste Unitário: Verifica se o método getUtilizadoresAindaNaoAprovados é chamado corretamente.
  it('deve obter utilizadores ainda não aprovados', () => {
    const utilizadoresDTO: UtilizadorDTO[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'user',
        phone: '123456789',
        taxpayer: '123456789',
        state: 'not_approved',
      },
    ];

    spyOn(utilizadorService, 'getUtilizadoresAindaNaoAprovados').and.returnValue(of(utilizadoresDTO));

    // Chama o método do componente que obtém utilizadores ainda não aprovados
    component.getUtilizadoresAindaNaoAprovados();

    // Garante que o método getUtilizadoresAindaNaoAprovados é chamado
    expect(utilizadorService.getUtilizadoresAindaNaoAprovados).toHaveBeenCalled();

    // Garante que os utilizadores são atribuídos corretamente à lista local
    expect(component.utilizadores.length).toBe(utilizadoresDTO.length);
    expect(component.utilizadores).toEqual(utilizadoresDTO);
  });

  // Teste Unitário: Verifica se o método updateUtilizadorState funciona corretamente.
  it('deve atualizar o estado do utilizador', () => {
    const codigo = 'codigo123';
    const novoEstado = 'novoEstado';
    
    const usuarioAtualizado: UtilizadorDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'user',
      phone: '123456789',
      taxpayer: '123456789',
      state: novoEstado,
    };

    spyOn(utilizadorService, 'updateUtilizadorState').and.returnValue(of(usuarioAtualizado));
    spyOn(component, 'getUtilizadoresAindaNaoAprovados').and.callThrough();
    
    component.updateUtilizadorState(codigo, novoEstado);
    
    expect(utilizadorService.updateUtilizadorState).toHaveBeenCalledWith(codigo, novoEstado);
    expect(component.getUtilizadoresAindaNaoAprovados).toHaveBeenCalled();
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
