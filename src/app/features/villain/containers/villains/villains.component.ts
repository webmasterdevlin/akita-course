import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { VillainModel } from "../../villain.model";
import { VillainsQuery } from "src/app/akita/queries/villains.query";
import { VillainsService } from "src/app/akita/services/villains.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-villains",
  templateUrl: "./villains.component.html",
  styleUrls: ["./villains.component.css"],
})
export class VillainsComponent implements OnInit {
  villains$: Observable<VillainModel[]>;
  isLoading$: Observable<boolean>;

  itemForm: FormGroup;
  editedForm: FormGroup;
  editingTracker = "0";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private villainsQuery: VillainsQuery,
    private villainService: VillainsService
  ) {}

  ngOnInit(): void {
    this.fetchVillains();
    this.getIsLoading();
    this.formBuilderInit();
  }

  handleDeleteVillain(id: string) {
    this.villainService.deleteVillain(id);
  }

  handlePostVillain() {
    this.villainService.postVillain(this.itemForm.value);
  }

  handlePutVillain() {
    this.villainService.putVillain(this.editedForm.value);
  }

  handleSoftDeleteVillain(id: string) {
    this.villainService.softDeleteVillain(id);
  }

  handleNavigateVillainDetail(id: string) {
    this.router.navigateByUrl("/villains/villain-detail/" + id);
  }

  private fetchVillains() {
    this.villainService.getVillains();
    this.villains$ = this.villainsQuery.selectVillains();
  }

  private getIsLoading() {
    this.isLoading$ = this.villainsQuery.selectIsLoading();
  }

  private formBuilderInit(): void {
    this.itemForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""],
    });

    this.editedForm = this.fb.group({
      id: [""],
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""],
    });
  }
}
