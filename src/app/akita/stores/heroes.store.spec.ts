import {HeroesStore} from './heroes.store';
import {HeroModel} from '../../features/hero/hero.model';

describe("HeroesStore",() => {
  let store : HeroesStore;
  const hero: HeroModel = {
    id:1,
    firstName: "Bruce",
    lastName: "Wayne",
    house:'DC',
    knownAs:"Batman"
  }

  beforeEach(() => {
    store = new HeroesStore();
  });

  it("should test add method", () => {
    spyOn(store, 'add');
    store.add(hero);
    expect(store.add).toHaveBeenCalled();
  });

  it("should test remove method", () => {
    spyOn(store, 'remove');
    store.remove(hero.id);
    expect(store.remove).toHaveBeenCalled();
  })
})
