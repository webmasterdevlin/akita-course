import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { ID, transaction } from "@datorama/akita";
import { HeroesStore } from "../stores/heroes.store";
import { HeroModel } from "../../features/hero/hero.model";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class HeroesService {
  path = environment.apiUrlBase + "heroes";

  constructor(private http: HttpClient, private heroStore: HeroesStore) {}

  @transaction()
  getHeroes(): void {
    this.heroStore.setLoading(true);
    this.http
      .get<HeroModel[]>(this.path)
      .pipe(
        catchError((error) => of([])),
        finalize(() => this.heroStore.setLoading(false))
      )
      .subscribe((data) => this.heroStore.set(data));
  }

  @transaction()
  deleteHero(id: ID): void {
    this.heroStore.setLoading(true);
    this.http
      .delete<void>(`${this.path}/${id}`)
      .pipe(
        catchError((error) => of([])),
        finalize(() => this.heroStore.setLoading(false))
      )
      .subscribe(() => this.heroStore.remove(id));
  }

  @transaction()
  postHero(createdHero: HeroModel): void {
    this.heroStore.setLoading(true);
    this.http
      .post<HeroModel>(this.path, createdHero)
      .pipe(
        catchError((error) => of([])),
        finalize(() => this.heroStore.setLoading(false))
      )
      .subscribe((data) => this.heroStore.add(data));
  }

  @transaction()
  putHero(updatedHero: HeroModel): void {
    this.heroStore.setLoading(true);
    this.http
      .put<void>(`${this.path}/${updatedHero.id}`, updatedHero)
      .pipe(
        catchError((error) => of([])),
        finalize(() => this.heroStore.setLoading(false))
      )
      .subscribe(() =>
        this.heroStore.update(updatedHero.id, { ...updatedHero })
      );
  }

  @transaction()
  softDeleteHero(id: ID): void {
    this.heroStore.remove(id);
  }
}
