import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UtilizadorService } from './utilizador-service';
import { UtilizadorDTO } from '../DTO/utilizador-dto';

describe('UtilizadorService', () => {
  let service: UtilizadorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UtilizadorService]
    });
    service = TestBed.inject(UtilizadorService);
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

  // Teste de integração de unidade: Verifica se o método getUtilizadores retorna dados fictícios.
  it('should get users', () => {
    const mockUtilizadores: UtilizadorDTO[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'user',
        phone: '123456789',
        taxpayer: '123456789',
        state: 'approved'
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password456',
        role: 'admin',
        phone: '987654321',
        taxpayer: '987654321',
        state: 'pending'
      }
    ];

    service.getUtilizadores().subscribe(utilizadores => {
      expect(utilizadores).toEqual(mockUtilizadores);
    });

    const req = httpMock.expectOne(`${service.utilizadorUrl}/listall`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUtilizadores);
  });

  // Teste de integração de unidade: Verifica se o método getUtilizadoresAindaNaoAprovados retorna dados fictícios.
  it('should get users not approved', () => {
    const mockUtilizadoresNaoAprovados: UtilizadorDTO[] = [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password456',
        role: 'admin',
        phone: '987654321',
        taxpayer: '987654321',
        state: 'pending'
      }
    ];

    service.getUtilizadoresAindaNaoAprovados().subscribe(utilizadores => {
      expect(utilizadores).toEqual(mockUtilizadoresNaoAprovados);
    });

    const req = httpMock.expectOne(`${service.utilizadorUrl}/listallNaoAprovado`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUtilizadoresNaoAprovados);
  });

  // Teste de integração de unidade: Verifica se o método createUtilizador cria um utilizador com sucesso.
  it('should create user', () => {
    const mockNovoUtilizador: UtilizadorDTO = {
      firstName: 'Alice',
      lastName: 'Wonderland',
      email: 'alice@example.com',
      password: 'password789',
      role: 'user',
      phone: '111222333',
      taxpayer: '111222333',
      state: 'approved'
    };

    service.createUtilizador(
      'Alice',
      'Wonderland',
      'alice@example.com',
      'password789',
      'user',
      '111222333',
      '111222333',
      'approved'
    ).subscribe(utilizador => {
      expect(utilizador).toEqual(mockNovoUtilizador);
    });

    const req = httpMock.expectOne(`${service.utilizadorUrl}/signup`);
    expect(req.request.method).toBe('POST');
    req.flush(mockNovoUtilizador);
  });

  // Teste de integração de unidade: Verifica se o método updateUtilizador atualiza um utilizador com sucesso.
  it('should update user', () => {
    const mockUtilizadorAtualizado: UtilizadorDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'user',
      phone: '987654321',
      taxpayer: '987654321',
      state: 'approved'
    };

    service.updateUtilizador(
      'John',
      'Doe',
      'john.doe@example.com',
      'password123',
      '987654321',
      '987654321'
    ).subscribe(utilizador => {
      expect(utilizador).toEqual(mockUtilizadorAtualizado);
    });

    const req = httpMock.expectOne(`${service.utilizadorUrl}/updateUtilizador`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockUtilizadorAtualizado);
  });

  // Teste de integração de unidade: Verifica se o método updateUtilizadorState atualiza o estado de um utilizador com sucesso.
  it('should update user state', () => {
    const mockUtilizadorAtualizado: UtilizadorDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'user',
      phone: '123456789',
      taxpayer: '123456789',
      state: 'blocked'
    };

    service.updateUtilizadorState('john.doe@example.com', 'blocked').subscribe(utilizador => {
      expect(utilizador).toEqual(mockUtilizadorAtualizado);
    });

    const req = httpMock.expectOne(`${service.utilizadorUrl}/updateUtilizadorState`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockUtilizadorAtualizado);
  });

  // Teste de integração de unidade: Verifica se o método loginUser faz o login de um utilizador com sucesso.
  it('should login user', () => {
    const mockLoginResponse = {
      token: 'mockToken123',
      user: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'user',
        phone: '123456789',
        taxpayer: '123456789',
        state: 'approved'
      }
    };

    service.loginUser('john.doe@example.com', 'password123').subscribe(response => {
      expect(response).toEqual(mockLoginResponse);
    });

    const req = httpMock.expectOne(`${service.utilizadorUrl}/signin/john.doe@example.com/password123`);
    expect(req.request.method).toBe('POST');
    req.flush(mockLoginResponse);
  });

  // Teste de integração de unidade: Verifica se o método deleteUser exclui um utilizador com sucesso.
  it('should delete user', () => {
    const emailToDelete = 'john.doe@example.com';

    service.deleteUser(emailToDelete).subscribe(() => {
      // Expect nothing for a successful deletion
    });

    const req = httpMock.expectOne(`${service.utilizadorUrl}/delete/${emailToDelete}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  // Teste de integração de unidade: Verifica se o método getToken retorna o token armazenado no localStorage.
  it('should get token', () => {
    const mockToken = 'mockToken123';

    spyOn(localStorage, 'getItem').and.returnValue(mockToken);

    const result = service.getToken();
    expect(result).toEqual(mockToken);
  });

  // Teste de integração de unidade: Verifica se o método getUserData retorna os dados do utilizador armazenados no localStorage.
  it('should get user data', () => {
    const mockUserData: UtilizadorDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'user',
      phone: '123456789',
      taxpayer: '123456789',
      state: 'approved'
    };

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUserData));

    const result = service.getUserData();
    expect(result).toEqual(mockUserData);
  });

  // Teste de integração de unidade: Verifica se o método clearUserData remove os dados do utilizador do localStorage.
  it('should clear user data', () => {
    spyOn(localStorage, 'removeItem');

    service.clearUserData();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userData');
  });

});
