import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { HeroesService } from "src/app/akita/services/heroes.service";
import { HeroesQuery } from "src/app/akita/queries/heroes.query";
import { VillainsService } from "src/app/akita/services/villains.service";
import { VillainsQuery } from "src/app/akita/queries/villains.query";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  totalHeroes$: Observable<number>;
  totalVillains$: Observable<number>;

  constructor(
    private heroService: HeroesService,
    private heroesQuery: HeroesQuery,
    private villainService: VillainsService,
    private villainsQuery: VillainsQuery
  ) {}

  ngOnInit(): void {
    this.fetchTotalCharacters();
  }

  handleLoadCharacters() {
    this.heroService.getHeroes();
    this.villainService.getVillains();
  }

  private fetchTotalCharacters() {
    this.totalHeroes$ = this.heroesQuery.totalHeroes();
    this.totalVillains$ = this.villainsQuery.totalVillains();
  }
}
