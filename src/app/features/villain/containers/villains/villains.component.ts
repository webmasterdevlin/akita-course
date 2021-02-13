import { Component, OnDestroy, OnInit } from "@angular/core";
import { untilDestroyed } from "ngx-take-until-destroy";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { VillainModel } from "../../villain.model";
import { VillainsQuery } from "src/app/akita/queries/villains.query";
import { VillainsService } from "src/app/akita/services/villains.service";

@Component({
  selector: "app-villains",
  templateUrl: "./villains.component.html",
  styleUrls: ["./villains.component.css"],
})
export class VillainsComponent implements OnInit, OnDestroy {
  villains: VillainModel[];
  itemForm: FormGroup;
  editedForm: FormGroup;
  error = "";
  isLoading = false;
  editingTracker = "0";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private villainsQuery: VillainsQuery,
    private villainService: VillainsService
  ) {}

  ngOnInit(): void {
    this.formBuilderInit();
    this.fetchVillains();
    this.loadingAndErrorInit();
  }

  // this is needed in untilDestroyed
  ngOnDestroy(): void {}

  fetchVillains() {
    this.villainService.getVillains();
    this.villainsQuery
      .selectAll()
      .pipe(untilDestroyed(this))
      .subscribe((data) => (this.villains = data));
  }

  removeVillain(id: string) {
    this.villainService.deleteVillainById(id);
  }

  onSave() {
    this.villainService.postVillain(this.itemForm.value);
  }

  onUpdate() {
    this.villainService.putVillain(this.editedForm.value);
  }

  goToVillainDetail(id: string) {
    this.router.navigateByUrl("/villains/villain-detail/" + id);
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

  loadingAndErrorInit() {
    this.villainsQuery
      .selectLoading()
      .pipe(untilDestroyed(this))
      .subscribe((loading) => (this.isLoading = loading));

    this.villainsQuery
      .selectError()
      .pipe(untilDestroyed(this))
      .subscribe((error) => (this.error = error));
  }
}
