import { Component, OnDestroy, OnInit } from "@angular/core";
import { untilDestroyed } from "ngx-take-until-destroy";
import { HeroModel } from "../../hero.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HeroesService } from "../../../../akita/services/heroes.service";
import { HeroesQuery } from "../../../../akita/queries/heroes.query";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit, OnDestroy {
  trackerReset = "0";
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

  // this is needed in untilDestroyed
  ngOnDestroy(): void {}

  fetchHeroes() {
    this.heroService.getHeroes();
    this.heroesQuery
      .selectAll()
      .pipe(untilDestroyed(this))
      .subscribe(data => (this.heroes = data));
  }

  removeHero(id: string) {
    this.heroService.deleteHeroById(id);
  }

  onSave() {
    // stop here if form is invalid
    if (this.itemForm.invalid) {
      return;
    }
    this.heroService.postHero(this.itemForm.value);
    this.itemForm.reset();
  }

  onUpdate() {
    // stop here if form is invalid
    if (this.editedForm.invalid) {
      return;
    }
    this.heroService.putHero(this.editedForm.value);
    this.editingTracker = this.trackerReset;
  }

  goToHeroDetail(id: string) {
    this.router.navigateByUrl("/heroes/hero-detail/" + id);
  }

  private formBuilderInit(): void {
    this.itemForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""]
    });

    this.editedForm = this.fb.group({
      id: [""],
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""]
    });
  }

  loadingAndErrorInit() {
    this.heroesQuery
      .selectLoading()
      .pipe(untilDestroyed(this))
      .subscribe(loading => (this.isLoading = loading));

    this.heroesQuery
      .selectError()
      .pipe(untilDestroyed(this))
      .subscribe(error => (this.error = error));
  }
}
