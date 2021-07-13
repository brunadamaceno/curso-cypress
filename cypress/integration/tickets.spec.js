

describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));


    ///Preenchimentos dos campos tipo texto:Primeironome, segundo nome, email, requests e assinatura
    it("Preenchimento de todos os campos tipo texto (Filling in all text type fields)", () => {
        const firstName = "Bruna";
        const lastName = "Damaceno"
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("bruna.isabela@gmail.com");
        cy.get("#requests").type("Ovolactovegetariano");
        cy.get("#signature").type('Bruna Isabela Damaceno');
    });

    // Ticket Quantity
    /*it("Selecionar quantidade 1 de ticket", () => {
        cy.get("#ticket-quantity").select("1");
    });
    it("Selecionar quantidade 2 de ticket", () => {
        cy.get("#ticket-quantity").select("2");
    });
    it("Selecionar quantidade 3 de ticket", () => {
        cy.get("#ticket-quantity").select("3");
    });*/

    it("Selecionar quantidade 4 de tickets (Select ticket quantity 4)", () => {
        cy.get("#ticket-quantity").select("4");
    });

    // Ticket type
    it("Selecionar o tipo de ticket 'VIP'(Select 'VIP' ticket type)", () => {
        cy.get("#vip").check();
    });

    it("Marcar a opção 'Social media' em 'How did you hear about this event?' (Check the 'Social media' option under 'How did you hear about this event?')", () => {
        cy.get("#social-media").check();
    });

    it("Selecionar as opções: 'Friend' e 'Publication' e desmarcar a opção 'Friend'(Selects 'Friend' and 'Publication', then uncheck 'Friend')", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });

    it("Contém o texto 'TICKETBOX no cabeçalho'(Has 'TICKETBOX' header's heading)", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it("Alerta sobre email inválido (Alerts on invalid email)", () => {
        cy.get("#email")
            .as("email")
            .type("brunaisabela-gmail.com");

        cy.get("#email.invalid").should("exist");

        cy.get("@email")
            .clear()
            .type("brunaisabela@gmail.com");

        cy.get("#email.invalid").should("not.exist");

    });

    it("Preenche e limpa os campos (Fill and reset the form)", () => {
        const firstName = "Bruna";
        const lastName = "Damaceno"
        const fullName = `${firstName} ${lastName}`;

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("bruna.isabela@gmail.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("RED WINE");
        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        );
        cy.get("#agree").click();
        cy.get("#signature").type(fullName);
        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        cy.get("button[type='reset']").click();
        cy.get("@submitButton").should("be.disabled");
    });

    it("Preenchimento dos campos obrigatórios (Fills mandatory fields using support comand)", () => {
        const customer = {
            firstName: "Caio",
            lastName: "Persighini",
            email: "caiopersighini@hotmail.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        cy.get("#agree").uncheck();
        cy.get("@submitButton").should("be.disabled");
    });

});