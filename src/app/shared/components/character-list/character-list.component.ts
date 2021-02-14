import { Component, OnInit } from "@angular/core";
import { HeroModel } from "src/app/features/hero/hero.model";
import { HeroesQuery } from "src/app/akita/queries/heroes.query";
import { VillainModel } from "src/app/features/villain/villain.model";
import { VillainsQuery } from "src/app/akita/queries/villains.query";
import { Observable } from "rxjs";

@Component({
  selector: "app-character-list",
  templateUrl: "./character-list.component.html",
  styleUrls: ["./character-list.component.css"],
})
export class CharacterListComponent implements OnInit {
  heroes$: Observable<HeroModel[]>;
  villains$: Observable<VillainModel[]>;

  constructor(
    private heroesQuery: HeroesQuery,
    private villainsQuery: VillainsQuery
  ) {}

  ngOnInit(): void {
    this.fetchHeroes();
    this.fetchVillains();
  }

  fetchHeroes() {
    this.heroes$ = this.heroesQuery.selectHeroes();
  }

  fetchVillains() {
    this.villains$ = this.villainsQuery.selectVillains();
  }
}
