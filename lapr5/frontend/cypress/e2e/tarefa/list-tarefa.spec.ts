describe('List Tarefa Component E2E Tests', () => {
    beforeEach(() => {
        cy.visit('/ListarTarefas');
    });

    it('should display a list of tarefas ainda não aprovadas', () => {
        // Verifica se há tarefas na lista
        cy.get('.tarefa-item').should('have.length.greaterThan', 0);
    });

    it('should paginate through the tarefas', () => {
        // Verifica se a paginação funciona corretamente
        cy.get('.pagination-container button').contains('Próxima').click();
        cy.get('.pagination-container .page-number').should('have.text', 'Página 2');
    });

    it('should update the estado of a tarefa when approved', () => {
        // Verifica se é possível aprovar uma tarefa
        cy.get('.tarefa-item').first().find('.registar-button:contains("Aprovar")').click();
        cy.get('.success-message').should('have.text', 'Estado da tarefa atualizado com sucesso!');
    });

    it('should update the estado of a tarefa when rejected', () => {
        // Verifica se é possível recusar uma tarefa
        cy.get('.tarefa-item').first().find('.registar-button:contains("Recusar")').click();
        cy.get('.success-message').should('have.text', 'Estado da tarefa atualizado com sucesso!');
    });

    it('should navigate back', () => {
        // Verifica se a navegação de volta ocorre corretamente
        cy.get('.registar-button:contains("Voltar")').click();
        cy.url().should('include', '/home');
    });
});
  