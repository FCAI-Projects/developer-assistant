export default describe("Login to app & create project", () => {
  it("login", () => {
    // escape exceptions
    cy.once("uncaught:exception", () => false);

    // login
    cy.visit("http://localhost:8080/login");
    cy.get("[name='email']").type("ezzdin1125@gmail.com");
    cy.get("[name='password']").type("123456789");
    cy.get("button[type='submit']").click();

    // Create project
    cy.get("[data-test='create-project']").click();
    cy.get("input[name='name']").type("test project");
    cy.get("input[name='description']").type("test project description");
    cy.get("input[name='clientEmail']").type("example@domain.com");
    cy.get("button[data-test='create-project-btn']").click();
  });
});
