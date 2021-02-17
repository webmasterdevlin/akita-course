import { HeroesQuery } from "./heroes.query";
import { HeroesStore } from "../stores/heroes.store";

describe("HeroesStore", () => {
  let query: HeroesQuery;
  let store: HeroesStore;

  beforeEach(() => {
    store = new HeroesStore();
    query = new HeroesQuery(store);
  });

  it("should test selectHeroes method", () => {
    spyOn(query, "selectHeroes");
    query.selectHeroes();

    expect(query.selectHeroes).toHaveBeenCalled();
    expect(query.selectHeroes.length).toEqual(0);
  });

  it("should test selectIsLoading method", () => {
    spyOn(query, "selectIsLoading");
    query.selectIsLoading();

    expect(query.selectIsLoading).toHaveBeenCalled();
  });
});
