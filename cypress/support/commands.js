Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Dhionathas', { delay: 0 })
    cy.get('#lastName').type('Felix', { delay: 0 })
    cy.get('#email').type('dhionathas.felix@gmail.com', { delay: 0 })
    cy.get('#open-text-area').type('Tudo certo, exercicio concluido!', { delay: 0 })
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('fillSelect', function(){

    
})