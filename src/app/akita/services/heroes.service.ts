import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ID } from "@datorama/akita";
import { HeroesStore } from "../stores/heroes.store";
import { HeroModel } from "../../features/hero/hero.model";
import { environment } from "../../../environments/environment";

@Injectable()
export class HeroesService {
  path = environment.apiUrlBase + "heroes";

  constructor(private http: HttpClient, private heroStore: HeroesStore) {}

  getHeroes(): void {
    this.http
      .get<HeroModel[]>(this.path)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)))
      .subscribe(data => this.heroStore.set(data));
  }

  deleteHeroById(id: ID): void {
    this.http
      .delete<void>(`${this.path}/${id}`)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)))
      .subscribe(() => this.heroStore.remove(id));
  }

  postHero(createdHero: HeroModel): void {
    this.http
      .post<HeroModel>(this.path, createdHero)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)))
      .subscribe(data => this.heroStore.add(data));
  }

  putHero(updatedHero: HeroModel): void {
    this.http
      .put<void>(`${this.path}/${updatedHero.id}`, updatedHero)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)))
      .subscribe(data =>
        this.heroStore.update(updatedHero.id, { ...updatedHero })
      );
  }

  getHeroById(id: string): void {
    this.http
      .get<HeroModel>(`${this.path}/${id}`)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)))
      .subscribe(data => this.heroStore.add(data));
  }
}
