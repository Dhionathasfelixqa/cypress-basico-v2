Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Dhionathas')
    cy.get('#lastName').type('Felix')
    cy.get('#email').type('dhionathas.felix@gmail.com')
    cy.get('#open-text-area').type('Tudo certo, exercicio concluido!', { delay: 0 })
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('fillSelect', function(){

    
})