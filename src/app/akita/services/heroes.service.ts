import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ID, transaction } from "@datorama/akita";
import { HeroesStore } from "../stores/heroes.store";
import { HeroModel } from "../../features/hero/hero.model";
import { environment } from "../../../environments/environment";
import { map, catchError, finalize } from "rxjs/operators";
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
        map((data) => this.heroStore.set(data)),
        catchError((error) => {
          this.heroStore.setError(error.statusText);
          return of([]);
        }),
        finalize(() => this.heroStore.setLoading(false))
      )
      .subscribe();
  }

  @transaction()
  deleteHero(id: ID): void {
    this.heroStore.setLoading(true);
    this.http
      .delete<void>(`${this.path}/${id}`)
      .pipe(
        map(() => this.heroStore.remove(id)),
        catchError((error) => {
          this.heroStore.setError(error.statusText);
          return of([]);
        }),
        finalize(() => this.heroStore.setLoading(false))
      )
      .subscribe();
  }

  @transaction()
  postHero(createdHero: HeroModel): void {
    this.heroStore.setLoading(true);
    this.http
      .post<HeroModel>(this.path, createdHero)
      .pipe(
        map((data) => this.heroStore.add(data)),
        catchError((error) => {
          this.heroStore.setError(error.statusText);
          return of([]);
        }),
        finalize(() => this.heroStore.setLoading(false))
      )
      .subscribe();
  }

  @transaction()
  putHero(updatedHero: HeroModel): void {
    this.heroStore.setLoading(true);
    this.http
      .put<void>(`${this.path}/${updatedHero.id}`, updatedHero)
      .pipe(
        map((data) =>
          this.heroStore.update(updatedHero.id, { ...updatedHero })
        ),
        catchError((error) => {
          this.heroStore.setError(error.statusText);
          return of([]);
        }),
        finalize(() => this.heroStore.setLoading(false))
      )
      .subscribe();
  }

  @transaction()
  softDeleteHero(id: ID): void {
    this.heroStore.remove(id);
  }
}
