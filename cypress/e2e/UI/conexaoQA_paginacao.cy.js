describe('paginação de QAs', () => {

    const URL = '/perfis'
    const ROTA_API = 'api/profile'
    const NAVEGACAO = '.paginationBttns li'

    it('valida a paginação com 7 perfis', () => {
        
        // fazer o spy na API de perfis
        cy.intercept('GET', ROTA_API, { fixture: 'paginacao_7_usuarios' })

        // visitar a página 
        cy.visit(URL)

        // valida se a paginação não existe
        cy.get(NAVEGACAO)
            .should('not.exist')
    })

    ;[
        { fixture: 'paginacao_8_usuarios', resulltadoEsperado: ['<', '1', '2', '>']},
        { fixture: 'paginacao_63_usuarios', resulltadoEsperado: ['<', '1', '2', '3', '4', '5', '6', '7', '8', '9', '>'] },
        { fixture: 'paginacao_64_usuarios', resulltadoEsperado: ['<', '1', '2', '3', '4', '5', '6', '...', '8', '9', '10', '>'] },
    ].forEach(({ fixture, resulltadoEsperado}) => {

        it(`valida a ${fixture}`, () => {

            // fazer o spy na API de perfis
            cy.intercept('GET', ROTA_API, { fixture })

            // visitar a página 
            cy.visit(URL)

            // valida a paginação
            cy.get(NAVEGACAO)
                .each((elemento, index) => {

                    cy.wrap(elemento)
                        .should('have.text', resulltadoEsperado[index])

                })
            
        })

    })

    it.skip('valida a paginação com 8 perfis', () => {

        const resulltadoEsperado = ['<', '1', '2', '>']

        // fazer o spy na API de perfis
        cy.intercept('GET', 'api/profile', { fixture: 'paginacao_8_usuarios' })

        // visitar a página 
        cy.visit('/perfis')
        
        // valida a paginação
        cy.get('.paginationBttns li')
            .each((elemento, index) => {

                cy.wrap(elemento)
                    .should('have.text', resulltadoEsperado[index])
                    
            })

        /** 
        cy.get('.paginationBttns li')
            .eq(0)
            .should('have.text', '<')

        cy.get('.paginationBttns li')
            .eq(1)
            .should('have.text', '1')

        cy.get('.paginationBttns li')
            .eq(2)
            .should('have.text', '2')

        cy.get('.paginationBttns li')
            .eq(3)
            .should('have.text', '>')
    */
        
    })

    it.skip('valida a paginação com 63 perfis', () => {
        const resulltadoEsperado = ['<', '1', '2', '3', '4', '5', '6', '7', '8', '9', '>']

        // fazer o spy na API de perfis
        cy.intercept('GET', 'api/profile', { fixture: 'paginacao_63_usuarios copy' })

        // visitar a página 
        cy.visit('/perfis')
        
        // valida a paginação
        cy.get('.paginationBttns li')
            .each((elemento, index) => {

                cy.wrap(elemento)
                    .should('have.text', resulltadoEsperado[index])
                    
            })
        
    })
    
})