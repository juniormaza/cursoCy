describe('página de login', () => {

    const CAMPO_EMAIL = 'login-email'
    const CAMPO_SENHA = 'login-password'
    const BOTAO_LOGIN = 'login-submit'

    beforeEach(() => {
        cy.visit('/login')
    })
    
    it('faz o login válido', () => {
        // spy na API do login
        cy.intercept('GET', '/api/profile/me')
            .as('apiLogin')

        // preenche o email 
        cy.getElement(CAMPO_EMAIL)
            .type(Cypress.env('email'))
            
            
        // preenche a senha
        cy.getElement(CAMPO_SENHA)
            .type(Cypress.env('senha'))

        // clica no login
        cy.getElement(BOTAO_LOGIN)
            .click()
         
        // espera a API do login responder
        cy.wait('@apiLogin')
            .then(({ response }) => {
                expect(response.body.user.name, 'RESPOSTA DA API').to.eq('amarildo')

            })

        // valida se o usuário está logado
        cy.getElement('dashboard-welcome')
            .should('be.visible')
            .and('contain', 'amarildo')

    })

    it('Faz o login inválido', () => {

        // spy na API login
        cy.intercept('POST', '/api/auth')
            .as('apiLogin')

        // preencher o email
        cy.getElement(CAMPO_EMAIL)
            .type(Cypress.env('email'))

        // preencher a senha 
        cy.getElement(CAMPO_SENHA)
            .type('abcdef')

        // clicar no botão login
        cy.getElement(BOTAO_LOGIN)
            .click()

        // esperar a API
        cy.wait('@apiLogin')
            .then(({ response }) => {
                expect(response.statusCode, 'Validação do HTTP Status Code').to.eq(401)
            })
        
        // validar a mensagem de retorno (erro)
        cy.getElement('alert')
            .should('have.text', 'Credenciais inválidas')
        
    })

    it.only('valida a digitação de uma email inválido', () => {

        // preencher o emial (inválido)
        cy.getElement(CAMPO_EMAIL)
            .type('junior')

        // preencher a senha 
        cy.getElement(CAMPO_SENHA)
            .type('abcdef')
            
        // validar a máscara do campo
        cy.contains('p', 'Digite um email válido')
            .should('be.visible')
        
    })

   
})