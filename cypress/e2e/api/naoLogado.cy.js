
describe('GET Api - Profile', () => {
    context('valida a API de perfis', () => {
        
        it('todos os perfis', () => {
            
            // cy.request('GET', '/api/profile')
            cy.request({
                url: '/api/profile',
                method: 'GET'
            }).then(({ status, duration, body}) => {
                expect(status, 'Status Code').to.eq(200)
                expect(duration, 'Duração').to.be.lessThan(1000)
                expect(body[0].status, 'Cargo Usuário 0').to.eq('QA Junior')
                expect(body[1].user.name).to.eq('Pedro Guerra')
                expect(body[0].skills).to.have.lengthOf(2)
                expect(body[0].date).to.not.be.null
            })
        })
    })
    context('valida um perfil especifico', () => {

        let urlApiPerfil = '/api/profile/user'
        let method = 'GET'

        it('seleciona um usuário inválido', () => {
            let usuarioId = '1'

            cy.request({
                method: method,
                url: `${urlApiPerfil}/${usuarioId}`,
                failOnStatusCode: false
            }).then(({ status, body }) => {
                expect(status, 'Status Code').to.eq(404)
                expect(body.errors[0].msg, 'Mensagem de Erro').to.eq('Perfil não encontrado')
            })

        })
        it.only('seleciona usuários válidos', () => {
            let usuarioId = '65c6334f4bba97099ce7d79d'
            
            cy.request({
                method: method,
                url: `${urlApiPerfil}/${usuarioId}`
            }).then(({  status, body}) => {
                expect(status).to.eq(200)
                expect(body.user.name).to.eq('Pedro Guerra')
            })

        })
    })
    
})