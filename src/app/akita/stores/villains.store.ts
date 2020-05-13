import { EntityStore, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";
import { VillainsState, VillainModel } from "../../features/villain/villain.model";

@Injectable()
@StoreConfig({ name: "villains" })
export class VillainsStore extends EntityStore<VillainsState, VillainModel> {
  constructor() {
    super();
  }
}
