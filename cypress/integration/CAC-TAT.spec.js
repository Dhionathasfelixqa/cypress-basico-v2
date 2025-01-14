/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function () {
    const THREE_SECONDS_IN_MS = 3000;


    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('Verifica o titulo da aplicação', function () {

        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Preenche os campos obrigatorios e envia o formulario', function () {
        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')


    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.clock()
        cy.get('#firstName')
            .type('Dhionathas', { delay: 0 })
        cy.get('#lastName')
            .type('Felix')
        cy.get('#email', { delay: 0 })
            .type('dhionathas.felixgmail.com', { delay: 0 })
        cy.get('#open-text-area')
            .type('Tudo certo, exercicio concluido!', { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')

    });

    it('Campo de telefone continua vazio quando preenchido com valor não numerico', function () {
        cy.get('#phone')
            .type('abcdefghij', { delay: 0 })
            .should('have.value', '')

    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.clock()
        cy.get('#firstName').type('Dhionathas', { delay: 0 })
        cy.get('#lastName').type('Felix', { delay: 0 })
        cy.get('#email').type('dhionathas.felixgmail.com', { delay: 0 })
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Tudo certo, exercicio concluido!', { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')

    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Dhionathas', { delay: 0 })
            .should('have.value', 'Dhionathas')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Felix', { delay: 0 })
            .should('have.value', 'Felix')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('dhionathas.felixgmail.com', { delay: 0 })
            .should('have.value', 'dhionathas.felixgmail.com')
            .clear()
            .should('have.value', '')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('#email')
            .type('dhionathas.felixgmail.com')
            .should('have.value', 'dhionathas.felixgmail.com')
            .clear()
            .should('have.value', '')
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    });

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')

    });

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('youtube')
            .should('have.value', 'youtube')
    });

    it('seleciona um produto (mentoria) por seu (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });
    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')

    });

    it('marca o tipo de atendimento "Feedback"', function () {

        cy.get('input[value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {


        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')


    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: "drag-drop" })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('@sampleFile', { action: "drag-drop" })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {

        cy.get('#privacy a').should('have.attr', 'target', '_blank')

    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    });


    Cypress._.times(1, () => {
        it('envia o formuário com sucesso usando um comando customizado', function () {
            cy.clock()
            cy.fillMandatoryFieldsAndSubmit()

            cy.get('.success').should('be.visible')
            cy.tick(THREE_SECONDS_IN_MS)
            cy.get('.success').should('not.be.visible')

        });

    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function () {

        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    });

    it('preenche a area de texto usando o comando invoke', function(){
        const longText = Cypress._.repeat('0123456789',20)

        cy.get('#open-text-area')
          .should('not.have.text')
          .invoke('val', longText)
          .should('have.value', longText)
    });

    it('faz uma requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
         .should(function(response) {
            const {status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
         })
    });

    it('Encontre o gato', function(){
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
            

    })

})

