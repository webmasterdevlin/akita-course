import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { ID, transaction } from "@datorama/akita";
import { VillainsStore } from "../stores/villains.store";
import { VillainModel } from "../../features/villain/villain.model";
import { catchError, finalize } from "rxjs/operators";
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
        catchError((error) => of([])),
        finalize(() => this.villainStore.setLoading(false))
      )
      .subscribe((data) => this.villainStore.set(data));
  }

  deleteVillain(id: ID): void {
    this.villainStore.setLoading(true);
    this.http
      .delete<void>(`${this.path}/${id}`)
      .pipe(
        catchError((error) => of([])),
        finalize(() => this.villainStore.setLoading(false))
      )
      .subscribe(() => this.villainStore.remove(id));
  }

  postVillain(createdVillain: VillainModel): void {
    this.villainStore.setLoading(true);
    this.http
      .post<VillainModel>(this.path, createdVillain)
      .pipe(
        catchError((error) => of([])),
        finalize(() => this.villainStore.setLoading(false))
      )
      .subscribe((data) => this.villainStore.add(data));
  }

  putVillain(updatedVillain: VillainModel): void {
    this.villainStore.setLoading(true);
    this.http
      .put<void>(`${this.path}/${updatedVillain.id}`, updatedVillain)
      .pipe(
        catchError((error) => of([])),
        finalize(() => this.villainStore.setLoading(false))
      )
      .subscribe(() =>
        this.villainStore.update(updatedVillain.id, { ...updatedVillain })
      );
  }

  @transaction()
  softDeleteVillain(id: ID): void {
    this.villainStore.remove(id);
  }
}
