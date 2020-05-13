import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ID } from "@datorama/akita";
import { VillainsStore } from "../stores/villains.store";
import { VillainModel } from "../../features/villain/villain.model";
import { environment } from "../../../environments/environment";

@Injectable()
export class VillainsService {
  path = environment.apiUrlBase + "villains";

  constructor(private http: HttpClient, private villainStore: VillainsStore) {}

  getVillains(): void {
    this.http
      .get<VillainModel[]>(this.path)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)))
      .subscribe(data => this.villainStore.set(data));
  }

  deleteVillainById(id: ID): void {
    this.http
      .delete<void>(`${this.path}/${id}`)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)))
      .subscribe(() => this.villainStore.remove(id));
  }

  postVillain(createdVillain: VillainModel): void {
    this.http
      .post<VillainModel>(this.path, createdVillain)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)))
      .subscribe(data => this.villainStore.add(data));
  }

  putVillain(updatedVillain: VillainModel): void {
    this.http
      .put<void>(`${this.path}/${updatedVillain.id}`, updatedVillain)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)))
      .subscribe(data =>
        this.villainStore.update(updatedVillain.id, { ...updatedVillain })
      );
  }

  getVillainById(id: string): void {
    this.http
      .get<VillainModel>(`${this.path}/${id}`)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)))
      .subscribe(data => this.villainStore.add(data));
  }
}
