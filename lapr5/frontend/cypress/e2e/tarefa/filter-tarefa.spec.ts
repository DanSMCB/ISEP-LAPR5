describe('Filter Tarefa Component E2E Tests', () => {
    beforeEach(() => {
      cy.visit('/FiltrarTarefas');
    });

    it('should filter tarefas by estado', () => {
      // Simula a seleção de filtro por estado e aplica um filtro específico
      cy.get('#filtroSelecionado').select('estado');
      cy.get('#estadoFilter').select('Aprovada');
      cy.get('#aplicar-filtros-button').click();

      // Verifica se as tarefas exibidas correspondem ao filtro aplicado
      cy.get('.tarefa-item').should('have.length.greaterThan', 0);
      cy.get('.estado-tarefa').each((estado: string) => {
        cy.wrap(estado).should('have.text', 'Aprovada');
      });
    });

    it('should filter tarefas by tipoDeRobot', () => {
      // Simula a seleção de filtro por tipoDeRobot e aplica um filtro específico
      cy.get('#filtroSelecionado').select('tipoDeRobot');
      cy.get('#tipoDeRobotFilter').select('Robisep');
      cy.get('#aplicar-filtros-button').click();

      // Verifica se as tarefas exibidas correspondem ao filtro aplicado
      cy.get('.tarefa-item').should('have.length.greaterThan', 0);
      cy.get('.tipo-de-robot').each((tipoDeRobot: string) => {
        cy.wrap(tipoDeRobot).should('have.text', 'Robisep');
      });
    });

    it('should filter tarefas by contactoRequisitante', () => {
      // Simula a seleção de filtro por contactoRequisitante e aplica um filtro específico
      cy.get('#filtroSelecionado').select('contacto');
      cy.get('#contactoRequisitanteFilter').type('John Doe');
      cy.get('#aplicar-filtros-button').click();

      // Verifica se as tarefas exibidas correspondem ao filtro aplicado
      cy.get('.tarefa-item').should('have.length.greaterThan', 0);
      cy.get('.contacto-requisitante').each((contactoRequisitante: string) => {
        cy.wrap(contactoRequisitante).should('include.text', 'John Doe');
      });
    });

    it('should navigate back', () => {
      // Verifica se a navegação de volta ocorre corretamente
      cy.get('.registar-button:contains("Voltar")').click();
      cy.url().should('include', '/home');
    });
});
