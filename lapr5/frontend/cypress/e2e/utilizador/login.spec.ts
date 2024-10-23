describe('Login Component E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/Login');
  });

  it('should log in successfully', () => {
    // Preenche o formulário de login com credenciais válidas e envia
    cy.get('#utilizador').type('seu_email@example.com');
    cy.get('#password').type('sua_senha');
    cy.get('.login-button').click();

    // Verifica se o login foi bem-sucedido
    cy.url().should('include', '/PoliticaPrivacidade');
  });

  it('should display error for invalid credentials', () => {
    // Preenche o formulário de login com credenciais inválidas e envia
    cy.get('#utilizador').type('email_invalido@example.com');
    cy.get('#password').type('senha_incorreta');
    cy.get('.login-button').click();

    // Verifica se uma mensagem de erro é exibida
    cy.contains('.error-message', 'Credenciais inválidas. Tente novamente.');
  });

  it('should navigate to registration page', () => {
    // Clica no link de registro
    cy.contains('Não tem uma conta?').click();

    // Verifica se a navegação para a página de registro ocorreu corretamente
    cy.url().should('include', '/Recolha');
  });

  it('should require email and password', () => {
    // Tenta enviar o formulário sem preencher email e senha
    cy.get('.login-button').click();

    // Verifica se mensagens de erro são exibidas para campos obrigatórios
    cy.contains('.error-message', 'Email é obrigatório');
    cy.contains('.error-message', 'Password é obrigatória');
  });

  it('should require a valid email format', () => {
    // Tenta preencher um formato de e-mail inválido
    cy.get('#utilizador').type('email_invalido');
    cy.get('.login-button').click();

    // Verifica se uma mensagem de erro é exibida para formato de e-mail inválido
    cy.contains('.error-message', 'Por favor, insira um endereço de e-mail válido.');
  });
});
