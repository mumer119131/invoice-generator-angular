import { Component, EventEmitter, Output } from '@angular/core';
import { billingDetailsFieldsDefault } from '../../data/generator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-from-and-to',
  imports: [ReactiveFormsModule],
  templateUrl: './from-and-to.component.html',
  styleUrl: './from-and-to.component.scss',
})
export class FromAndToComponent {



  @Output() toDetailsChanged = new EventEmitter<any>();
  @Output() fromDetailsChanged = new EventEmitter<any>();
  billingDetailsFields = billingDetailsFieldsDefault;
  toDetailsForm :FormGroup;
  fromDetailsForm :FormGroup;
  // defaultFormValue = {
  //   name: ['', Validators.required],
  //   address: ['', Validators.required],
  //   zip: ['', Validators.required],
  //   city: ['', Validators.required],
  //   country: ['', Validators.required],
  //   email: ['', Validators.required],
  //   phone: ['', Validators.required],
  // }
  defaultFormValue = {
    name: ['Umer Khan', Validators.required],
    address: ['Sample # 342 Jaranwala', Validators.required],
    zip: ['37250', Validators.required],
    city: ['Faisalabad', Validators.required],
    country: ['Pakistan', Validators.required],
    email: ['mumer119131@gmail.com', Validators.required],
    phone: ['+923456013122', Validators.required],
  }
  constructor(private fb: FormBuilder) {
    this.toDetailsForm = this.fb.group(this.defaultFormValue)
    this.fromDetailsForm = this.fb.group(this.defaultFormValue)
     // Emit the form value whenever there's a change
     this.toDetailsForm.valueChanges.subscribe((value) => {
      this.toDetailsChanged.emit(value);
    });
    this.fromDetailsForm.valueChanges.subscribe((value) => {
      this.fromDetailsChanged.emit(value);
    });
  }
}
