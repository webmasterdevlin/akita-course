import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { UntypedFormGroup, FormGroupDirective } from "@angular/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent {
  @Input() itemForm: UntypedFormGroup | any;
  @Input() text: string;

  @Output() handleSubmit = new EventEmitter<void>();

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  onSubmit() {
    this.handleSubmit.emit();
    this.formGroupDirective.resetForm();
  }

  get fn() {
    return this.itemForm.get("firstName");
  }

  get ln() {
    return this.itemForm.get("lastName");
  }
}
