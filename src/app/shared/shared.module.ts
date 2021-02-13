import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FormComponent } from "./components/form/form.component";
import { SharedMaterialModule } from "./shared-material.module";
import { CharacterListComponent } from "./components/character-list/character-list.component";

@NgModule({
  declarations: [FormComponent, CharacterListComponent],
  imports: [
    SharedMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
  ],
  exports: [
    FormComponent,
    CharacterListComponent,
    SharedMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
