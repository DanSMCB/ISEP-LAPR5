describe('Dados Pessoais Component E2E Tests', () => {
    beforeEach(() => {
      cy.visit('/AlterarDados');
    });
  
    it('should update user data', () => {
      // Preenche o formulário de dados pessoais e atualiza os dados
      cy.get('#firstName').type('NovoNome');
      cy.get('#lastName').type('NovoApelido');
      cy.get('#currentPassword').type('senhaAtual123');
      cy.get('#newPassword').type('novaSenha123');
      cy.get('#phone').type('123456789');
      cy.get('#taxpayer').type('123456789');
      cy.get('.registar-button:contains("Atualizar Dados")').click();
  
      // Verifica se os dados foram atualizados corretamente
      cy.contains('.success-message', 'Dados atualizados com sucesso!');
    });
  
    it('should download user data', () => {
      // Clica no botão para fazer download dos dados
      cy.get('.registar-button:contains("Baixar Dados")').click();
    });
  
    it('should require all fields', () => {
      // Tenta enviar o formulário sem preencher todos os campos obrigatórios
      cy.get('.registar-button:contains("Atualizar Dados")').click();
  
      // Verifica se uma mensagem de erro é exibida para campos obrigatórios
      cy.contains('.error-message', 'Por favor, preencha todos os campos obrigatórios.');
    });
  
    it('should require a valid email', () => {
      // Tenta preencher um e-mail inválido
      cy.get('#email').clear().type('emailInvalido');
      cy.get('.registar-button:contains("Atualizar Dados")').click();
  
      // Verifica se uma mensagem de erro é exibida para e-mail inválido
      cy.contains('.error-message', 'Por favor, insira um endereço de e-mail válido.');
    });
});
  