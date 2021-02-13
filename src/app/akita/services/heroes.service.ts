import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ID, transaction } from "@datorama/akita";
import { HeroesStore } from "../stores/heroes.store";
import { HeroModel } from "../../features/hero/hero.model";
import { environment } from "../../../environments/environment";
import { finalize } from "rxjs/operators";

@Injectable()
export class HeroesService {
  path = environment.apiUrlBase + "heroes";

  constructor(private http: HttpClient, private heroStore: HeroesStore) {}

  @transaction()
  getHeroes(): void {
    this.heroStore.setLoading(true);
    this.http
      .get<HeroModel[]>(this.path)
      .pipe(finalize(() => this.heroStore.setLoading(false)))
      .subscribe(
        (data) => this.heroStore.set(data),
        (error: HttpErrorResponse) => this.heroStore.setError(error.statusText)
      );
  }

  @transaction()
  deleteHero(id: ID): void {
    this.heroStore.setLoading(true);
    this.http
      .delete<void>(`${this.path}/${id}`)
      .pipe(finalize(() => this.heroStore.setLoading(false)))
      .subscribe(
        () => this.heroStore.remove(id),
        (error: HttpErrorResponse) => this.heroStore.setError(error.statusText)
      );
  }

  @transaction()
  postHero(createdHero: HeroModel): void {
    this.heroStore.setLoading(true);
    this.http
      .post<HeroModel>(this.path, createdHero)
      .pipe(finalize(() => this.heroStore.setLoading(false)))
      .subscribe(
        (data) => this.heroStore.add(data),
        (error: HttpErrorResponse) => this.heroStore.setError(error.statusText)
      );
  }

  @transaction()
  putHero(updatedHero: HeroModel): void {
    this.heroStore.setLoading(true);
    this.http
      .put<void>(`${this.path}/${updatedHero.id}`, updatedHero)
      .pipe(finalize(() => this.heroStore.setLoading(false)))
      .subscribe(
        (data) => this.heroStore.update(updatedHero.id, { ...updatedHero }),
        (error: HttpErrorResponse) => this.heroStore.setError(error.statusText)
      );
  }

  @transaction()
  softDeleteHero(id: ID): void {
    this.heroStore.remove(id);
  }
}
