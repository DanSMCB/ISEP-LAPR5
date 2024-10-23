import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { DadosPessoaisComponent } from './dados-pessoais.component';
import { UtilizadorService } from '../../services/utilizador-service';
import { of } from 'rxjs';
import { UtilizadorDTO } from '../../DTO/utilizador-dto';

describe('DadosPessoaisComponent', () => {
  let component: DadosPessoaisComponent;
  let fixture: ComponentFixture<DadosPessoaisComponent>;
  let utilizadorService: UtilizadorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DadosPessoaisComponent],
      providers: [UtilizadorService],
    }).compileComponents();

    fixture = TestBed.createComponent(DadosPessoaisComponent);
    component = fixture.componentInstance;
    utilizadorService = TestBed.inject(UtilizadorService);
    fixture.detectChanges();
  });

  // Teste Unitário de Inicialização do Componente: Verifica se a instância do componente é criada com sucesso.
  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  // Teste Unitário: Verifica se o método loadUserData carrega os dados do usuário corretamente.
  it('deve carregar os dados do usuário', () => {
    const mockUserData: UtilizadorDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'user',
      phone: '123456789',
      taxpayer: '123456789',
      state: 'approved',
    };

    spyOn(utilizadorService, 'getUserData').and.returnValue(mockUserData);

    component.loadUserData();

    expect(utilizadorService.getUserData).toHaveBeenCalled();
    expect(component.utilizador).toEqual(mockUserData);
  });

  // Teste Unitário: Verifica se o método updateUserData funciona corretamente.
  it('deve atualizar os dados do usuário', fakeAsync(() => {
    const mockValidPassword = true;
    const mockUpdatedUser: UtilizadorDTO = {
      firstName: 'Updated',
      lastName: 'User',
      email: 'john.doe@example.com',
      password: 'newPassword123',
      role: 'user',
      phone: '987654321',
      taxpayer: '987654321',
      state: 'approved',
    };

    spyOn(utilizadorService, 'verifyCurrentPassword').and.returnValue(of(mockValidPassword));
    spyOn(utilizadorService, 'updateUtilizador').and.returnValue(of(mockUpdatedUser));

    // Define as senhas atual e nova
    component.currentPassword = 'oldPassword123';
    component.newPassword = 'newPassword123';

    // Ativa o método updateUserData
    component.updateUserData();

    // Avança o tempo para simular operações assíncronas (por exemplo, solicitações HTTP)
    tick();

    expect(utilizadorService.verifyCurrentPassword).toHaveBeenCalledWith(component.utilizador.email, component.currentPassword);
    expect(utilizadorService.updateUtilizador).toHaveBeenCalledWith(
      component.utilizador.firstName,
      component.utilizador.lastName,
      component.utilizador.email,
      component.newPassword,
      component.utilizador.phone,
      component.utilizador.taxpayer
    );
    expect(component.utilizador).toEqual(mockUpdatedUser);
  }));

  // Teste Unitário: Verifica se o método downloadUserData funciona corretamente.
  it('deve baixar os dados do usuário', () => {
    const mockUserData: UtilizadorDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'user',
      phone: '123456789',
      taxpayer: '123456789',
      state: 'approved',
    };

    spyOn(utilizadorService, 'getUserData').and.returnValue(mockUserData);

    // Define os dados do usuário no componente
    component.utilizador = mockUserData;

    // Ativa o método downloadUserData
    component.downloadUserData();

    // Garante a criação e clique de um link de download
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalled();
  });
});
