/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('Verifica o titulo da aplicação', function () {

        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Preenche os campos obrigatorios e envia o formulario', function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success strong').should('have.text', 'Mensagem enviada com sucesso.')
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName')
            .type('Dhionathas')
        cy.get('#lastName')
            .type('Felix')
        cy.get('#email')
            .type('dhionathas.felixgmail.com')
        cy.get('#open-text-area')
            .type('Tudo certo, exercicio concluido!', { delay: 0 })
            cy.contains('button', 'Enviar').click()

        cy.get('.error strong').should('have.text', 'Valide os campos obrigatórios!')
    });

    it('Campo de telefone continua vazio quando preenchido com valor não numerico', function () {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')

    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Dhionathas')
        cy.get('#lastName').type('Felix')
        cy.get('#email').type('dhionathas.felixgmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Tudo certo, exercicio concluido!', { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.error strong').should('have.text', 'Valide os campos obrigatórios!')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Dhionathas')
            .should('have.value', 'Dhionathas')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Felix')
            .should('have.value', 'Felix')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('dhionathas.felixgmail.com')
            .should('have.value', 'dhionathas.felixgmail.com')
            .clear()
            .should('have.value', '')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()

        cy.get('.error strong').should('have.text', 'Valide os campos obrigatórios!')
    });

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success strong').should('have.text', 'Mensagem enviada com sucesso.')
    });

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('youtube')
            .should('have.value', 'youtube')
    });

    it('seleciona um produto (mentoria) por seu (value)', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
         .select(1)
         .should('have.value', 'blog')

    });

    it('marca o tipo de atendimento "Feedback"', function(){

        cy.get('input[value="feedback"]')
         .check()
         .should('have.value','feedback')
    })

    it('marca cada tipo de atendimento', function(){
        
        
        cy.get('input[type="radio"]')
         .should('have.length', 3)
         .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
         })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
          .check()
          .last()
          .uncheck()
          .should('not.be.checked')


    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('#file-upload')
           .should('not.have.value')
           .selectFile('cypress/fixtures/example.json')
           .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
           })
    })

    it('Seleciona um arquivo simulando um drag-and-drop',function() {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: "drag-drop"})
        .should(function($input){
         expect($input[0].files[0].name).to.equal('example.json') 
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('@sampleFile', {action: "drag-drop"})
        .should(function($input){
         expect($input[0].files[0].name).to.equal('example.json') 
        })

    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){

        cy.get('#privacy a').should('have.attr', 'target', '_blank')
        
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
            .invoke('removeAttr', 'target')
            .click()
            cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    });


})

