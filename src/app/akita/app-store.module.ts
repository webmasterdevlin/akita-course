import { NgModule } from "@angular/core";
import { HeroesService } from "./services/heroes.service";
import { HeroesStore } from "./stores/heroes.store";
import { HeroesQuery } from "./queries/heroes.query";
import {VillainsQuery} from './queries/villains.query';
import {VillainsService} from './services/villains.service';
import {VillainsStore} from './stores/villains.store';

@NgModule({
  imports: [],
  providers: [HeroesQuery, HeroesService, HeroesStore, VillainsQuery, VillainsService, VillainsStore]
})
export class AppStoreModule {}
