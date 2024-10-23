import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Route, Router, convertToParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { PoliticaPrivacidadeHomeComponent } from './politica-privacidade-home.component';
import { UtilizadorService } from '../../services/utilizador-service';
import { of } from 'rxjs';
import { Utilizador } from '../../models/utilizador';

describe('PoliticaPrivacidadeHomeComponent', () => {
  let component: PoliticaPrivacidadeHomeComponent;
  let fixture: ComponentFixture<PoliticaPrivacidadeHomeComponent>;
  let utilizadorService: UtilizadorService;
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PoliticaPrivacidadeHomeComponent],
      providers: [UtilizadorService, Location, ActivatedRoute],
    });
    fixture = TestBed.createComponent(PoliticaPrivacidadeHomeComponent);
    component = fixture.componentInstance;
    utilizadorService = TestBed.inject(UtilizadorService);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // Teste Unitário de Inicialização do Componente: Verifica se a instância do componente é criada com sucesso.
  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  // Teste Unitário: Verifica se o método proceed cria um utilizador e navega para a rota correta.
  it('deve criar um utilizador e navegar para a rota correta', () => {
    spyOn(utilizadorService, 'createUtilizador').and.returnValue(of({} as Utilizador));
    spyOn(window, 'alert'); // Evita que o alerta real seja chamado durante o teste
    spyOn(router, 'navigate');

    // Configuração de dados do componente
    component.consentCheckbox = true;

    // Ativa o método proceed
    component.proceed();

    // Garante que o serviço de utilizador seja chamado corretamente
    expect(utilizadorService.createUtilizador).toHaveBeenCalled();

    // Garante que a navegação ocorra para a rota correta
    expect(router.navigate).toHaveBeenCalledWith(['/Login']);

    // Garante que o alerta não seja chamado
    expect(window.alert).not.toHaveBeenCalled();
  });

  // Teste Unitário: Verifica se o método proceed exibe um alerta quando a caixa de consentimento não está marcada.
  it('deve exibir um alerta quando a caixa de consentimento não está marcada', () => {
    spyOn(utilizadorService, 'createUtilizador');
    spyOn(window, 'alert'); // Evita que o alerta real seja chamado durante o teste
    spyOn(router, 'navigate');

    // Ativa o método proceed sem marcar a caixa de consentimento
    component.proceed();

    // Garante que o serviço de utilizador não seja chamado
    expect(utilizadorService.createUtilizador).not.toHaveBeenCalled();

    // Garante que a navegação não ocorra
    expect(router.navigate).not.toHaveBeenCalled();

    // Garante que o alerta seja chamado
    expect(window.alert).toHaveBeenCalledWith('É necessário aceitar a Política de Privacidade para prosseguir.');
  });

  // Teste Unitário: Verifica se o método cancel navega para a rota correta.
  it('deve navegar para a rota correta ao cancelar', () => {
    spyOn(router, 'navigate');

    // Ativa o método cancel
    component.cancel();

    // Garante que a navegação ocorra para a rota correta
    expect(router.navigate).toHaveBeenCalledWith(['/Login']);
  });

  // Teste Unitário: Verifica se o método goBack utiliza o serviço Location corretamente.
  it('deve chamar o método back do Location ao voltar', () => {
    spyOn(location, 'back');

    // Ativa o método goBack
    component.goBack();

    // Garante que o método back do Location seja chamado
    expect(location.back).toHaveBeenCalled();
  });
});
