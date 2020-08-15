it("loads examples", () => {
  const baseUrl: string = "http://localhost:4200";
  cy.visit(baseUrl);
  cy.contains("Manutenções Strava");
});
