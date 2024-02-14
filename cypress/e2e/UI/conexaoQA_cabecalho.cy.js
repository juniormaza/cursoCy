describe('cabeçalho da página home', () => {

    const validarMenu = (seletor, link, menu) => {
        cy.getElement(seletor)
            .should('have.attr', 'href', link)
            .and('not.have.attr', 'target', '_blank')
            .and('have.text', menu)
    }

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

        it('valida os menus utilizando array', () => {

            const menus = [
                { seletor:'navbar-conexaoQA', link: '/' },
                { seletor:'navbar-QAs', link: '/perfis' },
                { seletor:'navbar-about', link: '/sobre' },
                { seletor:'navbar-register', link: '/cadastrar' },
                { seletor:'navbar-login', link: '/login' }
            ]

            menus.forEach(({ seletor, link }) => {
                cy.get(`[data-test=${seletor}]`)
                    .should('have.attr', 'href', link)
                    .and('not.have.attr', 'target')
            })
        })

        ;[
            { seletor:'navbar-conexaoQA', link: '/', menu: ' ConexãoQA' },
            { seletor:'navbar-QAs', link: '/perfis', menu: 'QAs' },
            { seletor:'navbar-about', link: '/sobre', menu: 'Sobre' },
            { seletor:'navbar-register', link: '/cadastrar', menu: 'Cadastrar' },
            { seletor:'navbar-login', link: '/login', menu: 'Login' }
        ].forEach(({ seletor, link, menu}) => {
           
            it(`valida o menu ${menu}`, () => {
                validarMenu(seletor, link, menu)
                
            })
        })

    })

    context('logado', () => {

        beforeEach(() => {
            cy.login(Cypress.env('email'), Cypress.env('senha')) 
            cy.visit('dashboard')
             
        })
        
        ;[
            { seletor:'navbar-conexaoQA', link: '/', menu: ' ConexãoQA' },
            { seletor:'navbar-QAs', link: '/perfis', menu: 'QAs' },
            { seletor:'navbar-posts', link: '/posts', menu: 'Posts' },
            { seletor:'navbar-dashboard', link: '/dashboard', menu: ' Dashboard' },
            { seletor:'navbar-about', link: '/sobre', menu: 'Sobre' },
            { seletor:'navbar-logout', link: '/', menu: ' Sair' },
        ].forEach(({seletor, link, menu }) => {

            it(`valida o menu ${menu}`, () => {
                validarMenu(seletor, link, menu)
                
            })

        })
    })
    
})