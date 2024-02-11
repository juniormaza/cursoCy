// loga na aplicação via API
Cypress.Commands.add('login', (email, password) => {

    cy.session([email, password], () => {
        cy.request({
            method:'POST',
            url:'/api/auth',
            body: {
                email,
                password
            }
        })
    }, { cacheAcrossSpecs: true})
})
