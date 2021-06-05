/// <reference types="cypress"/>

const VILLAINS = [
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

describe("Villains Page", () => {
  beforeEach(() => {
    /* Custom commands. Please see support/commands.ts
     * and the global.d.ts for intellisense */
    cy.getCommand("/villains", VILLAINS);
    cy.deleteCommand("/villains/*");

    cy.visit("/");
    cy.get("[data-testid=more]").click();
    cy.get("[data-testid=nav-villains]").click();
    cy.SetupInputFieldsCommand();
  });

  it("should render villains", () => {
    cy.location("pathname").should("equal", "/villains");
    cy.get("[data-testid=card]").should("have.length", VILLAINS.length);
  });

  describe("Villain's detail", () => {
    it("should navigate to villain's detail after clicking a detail button", () => {
      cy.get("[data-testid=detail-button]").eq(1).click();
      cy.location("pathname").should("contain", "/villain-detail/");
    });
  });

  describe("Soft delete a villain", () => {
    it("should remove temporarily a card after clicking a soft-delete button", () => {
      const index = 1;
      cy.get("[data-testid=soft-delete-button]").eq(index).click();
      cy.get("[data-testid=card]").should("have.length", VILLAINS.length - 1);
    });

    it("should remove temporarily a chip after clicking a soft-delete button", () => {
      const index = 1;
      cy.get("[data-testid=soft-delete-button]").eq(index).click();
      cy.get("[data-testid=villain-chip]").should(
        "have.length",
        VILLAINS.length - 1
      );
    });

    it("should deduct 1 temporarily from the total villains after clicking a soft-delete button", () => {
      const index = 1;
      cy.get("[data-testid=soft-delete-button]").eq(index).click();
      cy.get("[data-testid=total-villains]").should(
        "contain",
        VILLAINS.length - 1
      );
    });
  });

  describe("Delete a villain", () => {
    it("should remove a card after clicking a delete button", () => {
      const index = 1;
      cy.get("[data-testid=delete-button]").eq(index).click();
      cy.get("[data-testid=card]").should("have.length", VILLAINS.length - 1);
    });

    it("should remove a chip after clicking a delete button", () => {
      const index = 1;
      cy.get("[data-testid=delete-button]").eq(index).click();
      cy.get("[data-testid=villain-chip]").should(
        "have.length",
        VILLAINS.length - 1
      );
    });

    it("should deduct 1 from the total villains after clicking a delete button", () => {
      const index = 1;
      cy.get("[data-testid=delete-button]").eq(index).click();
      cy.get("[data-testid=total-villains]").should(
        "contain",
        VILLAINS.length - 1
      );
    });
  });

  describe("Add a new villain", () => {
    it("should create a new villain after filling out the form", () => {
      const firstName = "Bucky";
      const lastName = "Barnes";
      const house = "Marvel";
      const knownAs = "The Winter Soldier";

      cy.get("@FirstName").type(firstName);
      cy.get("@LastName").type(lastName);
      cy.get("@House").type(house);
      cy.get("@KnownAs").type(knownAs);

      cy.postCommand("/villains", {
        firstName,
        lastName,
        house,
        knownAs,
      });

      cy.get("@SaveUpdate").click();

      cy.get("[data-testid=card]").should("have.length", VILLAINS.length + 1);
      cy.get("[data-testid=villain-chip]").should(
        "have.length",
        VILLAINS.length + 1
      );
      cy.get("[data-testid=total-villains]").contains(VILLAINS.length + 1);
    });
  });

  describe("Refetch", () => {
    it("should refetch all villains after soft deleting all villains", () => {
      cy.get("[data-testid=soft-delete-button]").each(($el) =>
        cy.wrap($el).click()
      );
      cy.get("[data-testid=card]").should("not.exist");
      cy.get("[data-testid=refetch-button]").click();
      cy.get("[data-testid=card]").should("have.length", VILLAINS.length);
      cy.get("[data-testid=villain-chip]").should(
        "have.length",
        VILLAINS.length
      );
      cy.get("[data-testid=total-villains]").contains(VILLAINS.length);
    });

    it("should refetch all villains after deleting all villains", () => {
      cy.get("[data-testid=delete-button]").each(($el) => cy.wrap($el).click());
      cy.get("[data-testid=card]").should("not.exist");
      cy.get("[data-testid=refetch-button]").click();
      cy.get("[data-testid=card]").should("have.length", VILLAINS.length);
      cy.get("[data-testid=villain-chip]").should(
        "have.length",
        VILLAINS.length
      );
      cy.get("[data-testid=total-villains]").contains(VILLAINS.length);
    });
  });
});
