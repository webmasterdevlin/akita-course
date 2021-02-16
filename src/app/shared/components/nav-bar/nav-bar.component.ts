import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { HeroesQuery } from "src/app/akita/queries/heroes.query";
import { HeroesService } from "src/app/akita/services/heroes.service";
import { VillainsQuery } from "src/app/akita/queries/villains.query";
import { VillainsService } from "src/app/akita/services/villains.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  totalHeroes$: Observable<number>;
  totalVillains$: Observable<number>;

  constructor(
    private heroesQuery: HeroesQuery,
    private heroService: HeroesService,
    private villainsQuery: VillainsQuery,
    private villainService: VillainsService
  ) {}

  ngOnInit(): void {
    this.fetchTotalCharacters();
  }

  handleLoadCharacters() {
    this.heroService.getHeroes();
    this.villainService.getVillains();
  }

  private fetchTotalCharacters() {
    this.totalHeroes$ = this.heroesQuery.selectTotalHeroes();
    this.totalVillains$ = this.villainsQuery.selectTotalVillains();
  }
}
