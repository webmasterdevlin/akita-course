import { Component, OnDestroy, OnInit } from "@angular/core";
import { untilDestroyed } from "ngx-take-until-destroy";
import { VillainModel } from "../../villain.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { VillainsService } from "../../../../akita/services/villains.service";
import { VillainsQuery } from "../../../../akita/queries/villains.query";

@Component({
  selector: "app-villains",
  templateUrl: "./villains.component.html",
  styleUrls: ["./villains.component.css"]
})
export class VillainsComponent implements OnInit, OnDestroy {
  trackerReset = "0";
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
  }

  // this is needed in untilDestroyed
  ngOnDestroy(): void {}

  fetchVillains() {
    this.villainService.getVillains();
    this.villainsQuery
      .selectAll()
      .pipe(untilDestroyed(this))
      .subscribe(data => (this.villains = data));
  }

  removeVillain(id: string) {
    this.villainService.deleteVillainById(id);
  }

  onSave() {
    // stop here if form is invalid
    if (this.itemForm.invalid) {
      return;
    }
    this.villainService.postVillain(this.itemForm.value);
    this.itemForm.reset();
  }

  onUpdate() {
    // stop here if form is invalid
    if (this.editedForm.invalid) {
      return;
    }
    this.villainService.putVillain(this.editedForm.value);
    this.editingTracker = this.trackerReset;
  }

  goToVillainDetail(id: string) {
    this.router.navigateByUrl("/villains/villain-detail/" + id);
  }

  private formBuilderInit(): void {
    this.itemForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""]
    });

    this.editedForm = this.fb.group({
      id: [""],
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""]
    });
  }
}
