import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ID, transaction } from "@datorama/akita";
import { HeroesStore } from "../stores/heroes.store";
import { HeroModel } from "../../features/hero/hero.model";
import { environment } from "../../../environments/environment";

@Injectable()
export class HeroesService {
  path = environment.apiUrlBase + "heroes";

  constructor(private http: HttpClient, private heroStore: HeroesStore) { }

  @transaction()
  getHeroes(): void {
    this.http.get<HeroModel[]>(this.path).subscribe(
      data => this.heroStore.set(data),
      (error: HttpErrorResponse) => {
        this.heroStore.setLoading(false);
        this.heroStore.setError(error.statusText);
      }
    );
  }

  @transaction()
  deleteHeroById(id: ID): void {
    this.http.delete<void>(`${this.path}/${id}`).subscribe(
      () => this.heroStore.remove(id),
      (error: HttpErrorResponse) => {
        this.heroStore.setLoading(false);
        this.heroStore.setError(error.statusText);
      }
    );
  }

  @transaction()
  postHero(createdHero: HeroModel): void {
    this.http.post<HeroModel>(this.path, createdHero).subscribe(
      data => this.heroStore.add(data),
      (error: HttpErrorResponse) => {
        this.heroStore.setLoading(false);
        this.heroStore.setError(error.statusText);
      }
    );
  }

  @transaction()
  putHero(updatedHero: HeroModel): void {
    this.http
      .put<void>(`${this.path}/${updatedHero.id}`, updatedHero)
      .subscribe(
        data => this.heroStore.update(updatedHero.id, { ...updatedHero }),
        (error: HttpErrorResponse) => {
          this.heroStore.setLoading(false);
          this.heroStore.setError(error.statusText);
        }
      );
  }

  @transaction()
  getHeroById(id: string): void {
    this.http.get<HeroModel>(`${this.path}/${id}`).subscribe(
      data => this.heroStore.add(data),
      (error: HttpErrorResponse) => {
        this.heroStore.setLoading(false);
        this.heroStore.setError(error.statusText);
      }
    );
  }
}
