/// <reference types="cypress"/>

const HEROES = [
  {
    id: "7ggew732dw",
    firstName: "Barry",
    lastName: "Allen",
    house: "DC",
    knownAs: "Flash",
  },
  {
    id: "43twagfdh",
    firstName: "Scott",
    lastName: "Summer",
    house: "Marvel",
    knownAs: "Cyclopes",
  },
];

describe("Heroes Page", () => {
  beforeEach(() => {
    /* Custom commands. Please see support/commands.ts
     * and the global.d.ts for intellisense */
    cy.getCommand("/heroes", HEROES);
    cy.deleteCommand("/heroes/*");
    cy.visit("/");
    cy.SetupInputFieldsCommand();
  });

  it("should render heroes", () => {
    cy.get("[data-testid=card]").should("have.length", HEROES.length);
    cy.get("[data-testid=total-heroes]").should("contain", HEROES.length);
  });

  describe("Hero's detail", () => {
    it("should navigate to hero's detail after clicking a detail button", () => {
      cy.get("[data-testid=detail-button]").eq(1).click();
      cy.location("pathname").should("contain", "/hero-detail/");
    });
  });

  describe("Soft delete a hero", () => {
    it("should remove temporarily a card after clicking a soft-delete button", () => {
      const index = 1;
      cy.get("[data-testid=soft-delete-button]").eq(index).click();
      cy.get("[data-testid=card]").should("have.length", HEROES.length - 1);
    });

    it("should remove temporarily a chip after clicking a soft-delete button", () => {
      const index = 1;
      cy.get("[data-testid=soft-delete-button]").eq(index).click();
      cy.get("[data-testid=hero-chip]").should(
        "have.length",
        HEROES.length - 1
      );
    });

    it("should deduct 1 temporarily from the total heroes after clicking a soft-delete button", () => {
      const index = 1;
      cy.get("[data-testid=soft-delete-button]").eq(index).click();
      cy.get("[data-testid=total-heroes]").should("contain", HEROES.length - 1);
    });
  });

  describe("Delete a hero", () => {
    it("should remove a card after clicking a delete button", () => {
      const index = 1;
      cy.get("[data-testid=delete-button]").eq(index).click();
      cy.get("[data-testid=card]").should("have.length", HEROES.length - 1);
    });

    it("should remove a chip after clicking a delete button", () => {
      const index = 1;
      cy.get("[data-testid=delete-button]").eq(index).click();
      cy.get("[data-testid=hero-chip]").should(
        "have.length",
        HEROES.length - 1
      );
    });

    it("should deduct 1 from the total heroes after clicking a delete button", () => {
      const index = 1;
      cy.get("[data-testid=delete-button]").eq(index).click();
      cy.get("[data-testid=total-heroes]").should("contain", HEROES.length - 1);
    });
  });

  describe("Add a new hero", () => {
    it("should create a new hero after filling out the form", () => {
      const firstName = "Bucky";
      const lastName = "Barnes";
      const house = "Marvel";
      const knownAs = "The Winter Soldier";

      cy.get("@FirstName").type(firstName);
      cy.get("@LastName").type(lastName);
      cy.get("@House").type(house);
      cy.get("@KnownAs").type(knownAs);

      cy.postCommand("/heroes", {
        firstName,
        lastName,
        house,
        knownAs,
      });

      cy.get("@SaveUpdate").click();

      cy.get("[data-testid=card]").should("have.length", HEROES.length + 1);
      cy.get("[data-testid=hero-chip]").should(
        "have.length",
        HEROES.length + 1
      );
      cy.get("[data-testid=total-heroes]").contains(HEROES.length + 1);
    });
  });

  describe("Refetch", () => {
    it("should refetch all heroes after soft deleting all heroes", () => {
      cy.get("[data-testid=soft-delete-button]").each(($el) =>
        cy.wrap($el).click()
      );
      cy.get("[data-testid=card]").should("not.exist");
      cy.get("[data-testid=refetch-button]").click();
      cy.get("[data-testid=card]").should("have.length", HEROES.length);
      cy.get("[data-testid=hero-chip]").should("have.length", HEROES.length);
      cy.get("[data-testid=total-heroes]").contains(HEROES.length);
    });

    it("should refetch all heroes after deleting all heroes", () => {
      cy.get("[data-testid=delete-button]").each(($el) => cy.wrap($el).click());
      cy.get("[data-testid=card]").should("not.exist");
      cy.get("[data-testid=refetch-button]").click();
      cy.get("[data-testid=card]").should("have.length", HEROES.length);
      cy.get("[data-testid=hero-chip]").should("have.length", HEROES.length);
      cy.get("[data-testid=total-heroes]").contains(HEROES.length);
    });
  });
});
