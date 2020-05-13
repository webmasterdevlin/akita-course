import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { VillainsState, VillainModel } from "../../features/villain/villain.model";
import { VillainsStore } from "../stores/villains.store";

@Injectable()
export class VillainsQuery extends QueryEntity<VillainsState, VillainModel> {
  constructor(protected villainsStore: VillainsStore) {
    super(villainsStore);
  }
}
