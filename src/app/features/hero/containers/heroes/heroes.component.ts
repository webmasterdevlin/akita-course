import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HeroModel } from "../../hero.model";
import { HeroesQuery } from "src/app/akita/queries/heroes.query";
import { HeroesService } from "src/app/akita/services/heroes.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"],
})
export class HeroesComponent implements OnInit {
  heroes$: Observable<HeroModel[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  itemForm: FormGroup;
  editedForm: FormGroup;
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
    this.heroes$ = this.heroesQuery.selectHeroes();
  }

  handleDeleteHero(id: string) {
    this.heroService.deleteHero(id);
  }

  handlePostHero() {
    this.heroService.postHero(this.itemForm.value);
  }

  handlePutHero() {
    this.heroService.putHero(this.editedForm.value);
  }

  handleSoftDeleteHero(id: string) {
    this.heroService.softDeleteHero(id);
  }

  handleNavigateHeroDetail(id: string) {
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
    this.isLoading$ = this.heroesQuery.isLoading();
    this.error$ = this.heroesQuery.errorMessage();
  }
}
