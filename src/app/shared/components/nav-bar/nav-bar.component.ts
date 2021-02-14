import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable } from "rxjs";
import { HeroesQuery } from "src/app/akita/queries/heroes.query";
import { VillainsQuery } from "src/app/akita/queries/villains.query";
import { HeroesService } from "src/app/akita/services/heroes.service";
import { VillainsService } from "src/app/akita/services/villains.service";

@UntilDestroy()
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
    private villainsQuery: VillainsQuery,
    private heroService: HeroesService,
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
    this.totalHeroes$ = this.heroesQuery.totalHeroes();
    this.totalVillains$ = this.villainsQuery.totalVillains();
  }
}
