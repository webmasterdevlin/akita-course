import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent {
  @Input() itemForm: FormGroup | any;
  @Input() text: string;

  @Output() handleSubmit = new EventEmitter<void>();

  onSubmit() {
    this.handleSubmit.emit();
  }

  get fn() {
    return this.itemForm.get("firstName");
  }

  get ln() {
    return this.itemForm.get("lastName");
  }
}
