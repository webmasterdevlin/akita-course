import { NgModule } from "@angular/core";
import { HeroesService } from "./services/heroes.service";
import { HeroesStore } from "./stores/heroes.store";
import { HeroesQuery } from "./queries/heroes.query";

@NgModule({
  imports: [],
  providers: [HeroesQuery, HeroesService, HeroesStore]
})
export class AppStoreModule {}
