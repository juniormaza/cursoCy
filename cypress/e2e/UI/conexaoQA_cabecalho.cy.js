describe('cabeçalho da página home', () => {

    context('não logado', () => {
        beforeEach(() => {
            cy.visit('/')
            
        })

        it('valida o menu conexaoQa', () => {
            /**
             * Clicar uma vez . click()
             * clicar duas vezes .dblclick()
             * clicar com o botão direito .rightclick()
             */

            cy.get('[data-test=navbar-conexaoQA]')
                .should('have.attr', 'href', '/')
                .and('not.have.attr', 'target')
        })

        it('valida o menu QAs', () => {
            
            cy.get('[data-test=navbar-QAs]')
                .should('have.attr', 'href', '/perfis')
                .and('not.have.attr', 'target')
        })

        it('valida o menu sobre', () => {
            
            cy.get('[data-test=navbar-about]')
                .should('have.attr', 'href', '/sobre')
                .and('not.have.attr', 'target')
        })
        it('valida o menu cadastrar', () => {
            
            cy.get('[data-test=navbar-register]')
                .should('have.attr', 'href', '/cadastrar')
                .and('not.have.attr', 'target')
        })

        it('valida o menu login', () => {
            
            cy.get('[data-test=navbar-login]')
                .should('have.attr', 'href', '/login')
                .and('not.have.attr', 'target')
        })
    })

    context('logado', () => {
        
    })
    
})