import { Component, OnInit } from "@angular/core";
import { HeroModel } from "src/app/features/hero/hero.model";
import { VillainModel } from "src/app/features/villain/villain.model";
import { HeroesQuery } from "src/app/akita/queries/heroes.query";
import { VillainsQuery } from "src/app/akita/queries/villains.query";

@Component({
  selector: "app-character-list",
  templateUrl: "./character-list.component.html",
  styleUrls: ["./character-list.component.css"],
})
export class CharacterListComponent implements OnInit {
  heroes: HeroModel[];
  villains: VillainModel[];

  constructor(
    private heroesQuery: HeroesQuery,
    private villainsQuery: VillainsQuery
  ) {}

  ngOnInit(): void {
    this.fetchHeroes();
    this.fetchVillains();
  }

  fetchHeroes() {
    this.heroesQuery.selectHeroes();
  }

  fetchVillains() {
    this.villainsQuery.selectVillains();
  }
}
