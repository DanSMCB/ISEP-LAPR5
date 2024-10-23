describe('Create Tarefa Component E2E Tests', () => {
    beforeEach(() => {
      cy.visit('/CriarTarefa');
    });

    it('should create a new task of type vigilancia', () => {
      // Preenche os campos necessários para criar uma tarefa do tipo 'vigilancia'
      cy.get('#new-tarefa').type('C123');
      cy.get('#new-tarefa-descricao').type('Descrição da tarefa');
      cy.get('#new-tarefa-robot').select('Número de Série do Robot');
      cy.get('#new-tarefa-contacto-requisitante').type('Contacto do Requisitante');
      cy.get('#new-tarefa-tipo').select('vigilancia');
      cy.get('#new-tarefa-edificio').select('Id do Edificio');
      cy.get('#new-tarefa-pisos').type('1,2,3');
      cy.get('#new-tarefa-contacto-incidente').type('Contacto em caso de Incidente');
      
      cy.get('#registar-button').click();

      // Verifica se a tarefa foi criada corretamente
      cy.contains('.success-message', 'Tarefa criada com sucesso!');
    });

    it('should create a new task of type entrega de objetos', () => {
      // Preenche os campos necessários para criar uma tarefa do tipo 'entrega de objetos'
      cy.get('#new-tarefa').type('C124');
      cy.get('#new-tarefa-descricao').type('Descrição da tarefa');
      cy.get('#new-tarefa-robot').select('Número de Série do Robot');
      cy.get('#new-tarefa-contacto-requisitante').type('Contacto do Requisitante');
      cy.get('#new-tarefa-tipo').select('entrega de objetos');
      cy.get('#new-tarefa-sala-recolha').select('Sala da Recolha');
      cy.get('#new-tarefa-sala-entrega').select('Sala da Entrega');
      cy.get('#new-tarefa-contacto-recolha').type('Contacto da Recolha');
      cy.get('#new-tarefa-contacto-entrega').type('Contacto da Entrega');
      
      cy.get('#registar-button').click();

      // Verifica se a tarefa foi criada corretamente
      cy.contains('.success-message', 'Tarefa criada com sucesso!');
    });

    it('should navigate back', () => {
      // Verifica se a navegação de volta ocorre corretamente
      cy.get('.registar-button:contains("Voltar")').click();
      cy.url().should('include', '/home');
    });
});
