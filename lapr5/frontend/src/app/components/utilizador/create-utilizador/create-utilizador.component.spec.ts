import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { CreateUtilizadorComponent } from './create-utilizador.component';
import { UtilizadorService } from '../../../services/utilizador-service';

describe('CreateUtilizadorComponent', () => {
  let component: CreateUtilizadorComponent;
  let fixture: ComponentFixture<CreateUtilizadorComponent>;
  let utilizadorService: UtilizadorService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUtilizadorComponent],
      providers: [
        UtilizadorService,
        { provide: Location, useValue: {} },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUtilizadorComponent);
    component = fixture.componentInstance;
    utilizadorService = TestBed.inject(UtilizadorService);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  // Teste Unitário: Verifica se a instância do componente é criada com sucesso.
  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  // Teste Unitário: Verifica se o método createUtilizador é chamado corretamente.
  it('deve criar um utilizador', () => {
    spyOn(utilizadorService, 'createUtilizador').and.returnValue(of({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'admin',
      phone: '123456789',
      taxpayer: '123456789',
      state: 'aprovado',
    }));

    // Chama o método do componente que cria um utilizador
    component.createUtilizador('John', 'Doe', 'john.doe@example.com', 'password123', 'admin', '123456789');

    // Garante que o método createUtilizador é chamado com os parâmetros corretos
    expect(utilizadorService.createUtilizador).toHaveBeenCalledWith('John', 'Doe', 'john.doe@example.com', 'password123', 'admin', '123456789', '', 'aprovado');

    // Garante que o utilizador foi adicionado à lista de utilizadores
    expect(component.utilizadores.length).toBe(1);
  });

  // Teste Unitário: Verifica se o método goBack funciona corretamente.
  it('deve voltar', () => {
    spyOn(location, 'back').and.callThrough();
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});
