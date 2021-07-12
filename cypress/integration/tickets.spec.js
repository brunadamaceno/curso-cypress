

describe("Tickets", () => {
    beforeEach (() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));

it("fills all the text input fields", () => {
    const firstName = "Bruna";
    const lastName =  "Damaceno"
    cy.get("#first-name").type(firstName);
    cy.get("#last-name").type(lastName);
    cy.get("#email").type("bruna.isabela@gmail.com");
    cy.get("#requests").type("Ovolactovegetariano");
    cy.get("#signature").type('Bruna Isabela Damaceno');
});

it("select two tickets", () => {
    cy.get ("#ticket-quantity").select("2");
});

it("select 'VIP' ticket type", () => {
    cy.get("#vip").check();
});

it("selects 'Social media' checkbox", () => {
    cy.get("#social-media").check();
});

it("selects 'Friend' and 'Publication', then uncheck 'friend'", () => {
    cy.get("#friend").check();
    cy.get("#publication").check();
    cy.get("#friend").uncheck();
});

it("has 'TICKETBOX' header's heading", () => {
cy.get("header h1").should("contain", "TICKETBOX");
});

it("alerts on invalid email", () => {
cy.get ("#email")
  .as("email")
  .type("brunaisabela-gmail.com");

  cy.get("#email.invalid").should ("exist");

cy.get("@email")
.clear()
.type("brunaisabela@gmail.com");

cy.get("#email.invalid").should("not.exist");

});

it("fill and reset the form", () =>{
    const firstName = "Bruna";
    const lastName =  "Damaceno"
    const fullName = `${firstName} ${lastName}`;

    cy.get("#first-name").type(firstName);
    cy.get("#last-name").type(lastName);
    cy.get("#email").type("bruna.isabela@gmail.com");
    cy.get ("#ticket-quantity").select("2");
    cy.get("#vip").check();
    cy.get("#friend").check();
    cy.get("#requests").type("RED WINE");
    cy.get (".agreement p").should (
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

it("fills mandatory fields using support comand", () => {
    const customer = {
        firstName: "Caio",
        lastName: "Persighini",
        email: "caiopersighini@hotmail.com"
    };

    cy.fillMandatoryFields (customer);

    cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

    cy.get("#agree").uncheck();
    cy.get("@submitButton").should("be.disabled");
});

});