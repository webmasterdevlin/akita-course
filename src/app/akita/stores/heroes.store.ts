import { EntityStore, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";
import { HeroesState, HeroModel } from "../../features/hero/hero.model";

@Injectable()
@StoreConfig({ name: "heroes" })
export class HeroesStore extends EntityStore<HeroesState, HeroModel> {
  constructor() {
    super({
      error: ""
    });
  }
}
