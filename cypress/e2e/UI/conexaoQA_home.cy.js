describe('página inicial', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('valida o título da página inicial', () => {
       
        cy.get('[data-test="landing-title"]')
            .should('have.text', 'Conectando QAs ...')
            .and('have.class', 'x-large')
    })

    it('seleciona um elemento com o contains', () => {
        
        cy.contains('h1', 'QAs')
            .should('have.text', 'Conectando QAs ...') 
            
       
    })

    it('valida propriedade css do botão registrar', () => {
        // valida se o texto do botão registrar é branco 
        cy.get('[data-test=landing-register]')
            .should('have.css', 'color', 'rgb(255, 255, 255)')
        
    })

    it('seleciona um elemento utilizando filter', () => {
        // filtrar utilizando o comando filter
        cy.get('a')
            .filter('.btn-primary')
            .should('have.text', 'Cadastrar')

        // filtrar utilizando o comando eq
        cy.get('a')
            .eq(6)
            .should('have.text', 'Login')
    })  
})