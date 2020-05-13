import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FormComponent } from "./components/form/form.component";
import { SharedMaterialModule } from "./shared-material.module";

@NgModule({
  declarations: [FormComponent],
  imports: [
    SharedMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" })
  ],
  exports: [
    FormComponent,
    SharedMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class SharedModule {}
