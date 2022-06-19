export default describe("Login to app & create project", () => {
  it("login", () => {
    cy.once("uncaught:exception", () => false);
    cy.visit("http://localhost:8080/login");
    cy.get("[name='email']").type("ezzdin1125@gmail.com");
    cy.get("[name='password']").type("123456789");
    cy.get("button[type='submit']").click();
    cy.visit("http://localhost:8080/app");
    cy.get("[data-test='create-project']").click();
  });
});
