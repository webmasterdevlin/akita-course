import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ID, transaction } from "@datorama/akita";
import { VillainsStore } from "../stores/villains.store";
import { VillainModel } from "../../features/villain/villain.model";
import { environment } from "../../../environments/environment";
import { map, catchError, finalize } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class VillainsService {
  path = environment.apiUrlBase + "villains";

  constructor(private http: HttpClient, private villainStore: VillainsStore) {}

  getVillains(): void {
    this.villainStore.setLoading(true);
    this.http
      .get<VillainModel[]>(this.path)
      .pipe(
        map((data) => this.villainStore.set(data)),
        catchError((error) => {
          this.villainStore.setError(error.statusText);
          return of([]);
        }),
        finalize(() => this.villainStore.setLoading(false))
      )
      .subscribe();
  }

  deleteVillain(id: ID): void {
    this.villainStore.setLoading(true);
    this.http
      .delete<void>(`${this.path}/${id}`)
      .pipe(
        map(() => this.villainStore.remove(id)),
        catchError((error) => {
          this.villainStore.setError(error.statusText);
          return of([]);
        }),
        finalize(() => this.villainStore.setLoading(false))
      )
      .subscribe();
  }

  postVillain(createdVillain: VillainModel): void {
    this.villainStore.setLoading(true);
    this.http
      .post<VillainModel>(this.path, createdVillain)
      .pipe(
        map((data) => this.villainStore.add(data)),
        catchError((error) => {
          this.villainStore.setError(error.statusText);
          return of([]);
        }),
        finalize(() => this.villainStore.setLoading(false))
      )
      .subscribe();
  }

  putVillain(updatedVillain: VillainModel): void {
    this.villainStore.setLoading(true);
    this.http
      .put<void>(`${this.path}/${updatedVillain.id}`, updatedVillain)
      .pipe(
        map((data) =>
          this.villainStore.update(updatedVillain.id, { ...updatedVillain })
        ),
        catchError((error) => {
          this.villainStore.setError(error.statusText);
          return of([]);
        }),
        finalize(() => this.villainStore.setLoading(false))
      )
      .subscribe();
  }

  @transaction()
  softDeleteVillain(id: ID): void {
    this.villainStore.remove(id);
  }
}
