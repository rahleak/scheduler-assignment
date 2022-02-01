const { CYCLIC_KEY } = require("@storybook/addon-actions");

describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("li", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected")
  });
});