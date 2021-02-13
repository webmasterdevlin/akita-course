import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HeroModel } from "../../hero.model";
import { HeroesQuery } from "src/app/akita/queries/heroes.query";
import { HeroesService } from "src/app/akita/services/heroes.service";

@UntilDestroy()
@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"],
})
export class HeroesComponent implements OnInit {
  heroes: HeroModel[];
  itemForm: FormGroup;
  editedForm: FormGroup;
  error = "";
  isLoading = false;
  editingTracker = "0";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private heroesQuery: HeroesQuery,
    private heroService: HeroesService
  ) {}

  ngOnInit(): void {
    this.formBuilderInit();
    this.fetchHeroes();
    this.loadingAndErrorInit();
  }

  fetchHeroes() {
    this.heroService.getHeroes();
    this.heroesQuery
      .selectAll()
      .pipe(untilDestroyed(this))
      .subscribe((data) => (this.heroes = data));
  }

  removeHero(id: string) {
    this.heroService.deleteHeroById(id);
  }

  onSave() {
    this.heroService.postHero(this.itemForm.value);
  }

  onUpdate() {
    this.heroService.putHero(this.editedForm.value);
  }

  goToHeroDetail(id: string) {
    this.router.navigateByUrl("/heroes/hero-detail/" + id);
  }

  private formBuilderInit(): void {
    this.itemForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""],
    });

    this.editedForm = this.fb.group({
      id: [""],
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""],
    });
  }

  loadingAndErrorInit() {
    this.heroesQuery
      .selectLoading()
      .pipe(untilDestroyed(this))
      .subscribe((loading) => (this.isLoading = loading));

    this.heroesQuery
      .selectError()
      .pipe(untilDestroyed(this))
      .subscribe((error) => (this.error = error));
  }
}
