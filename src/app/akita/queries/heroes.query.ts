import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { HeroesState, HeroModel } from "../../features/hero/hero.model";
import { HeroesStore } from "../stores/heroes.store";

@Injectable()
export class HeroesQuery extends QueryEntity<HeroesState, HeroModel> {
  constructor(protected heroesStore: HeroesStore) {
    super(heroesStore);
  }
}
