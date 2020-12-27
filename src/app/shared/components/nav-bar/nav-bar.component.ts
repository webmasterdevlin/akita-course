import { Component, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HeroesQuery } from 'src/app/akita/queries/heroes.query';
import { VillainsQuery } from 'src/app/akita/queries/villains.query';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  totalHeroes = 0;
  totalVillains = 0;

  constructor(
    private heroesQuery: HeroesQuery,
    private villainsQuery: VillainsQuery,
  ) { }

  ngOnInit(): void {
    this.fetchTotalCharacters();
  }

  fetchTotalCharacters() {
    this.heroesQuery.selectAll().pipe(untilDestroyed(this))
      .subscribe(heroes => this.totalHeroes = heroes.length);

    this.villainsQuery.selectAll().pipe(untilDestroyed(this))
      .subscribe(villains => this.totalVillains = villains.length);
  }

  // this is needed in untilDestroyed
  ngOnDestroy(): void { }
}
