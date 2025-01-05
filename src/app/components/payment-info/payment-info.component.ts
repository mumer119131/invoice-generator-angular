import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-info',
  imports: [ReactiveFormsModule],
  templateUrl: './payment-info.component.html',
  styleUrl: './payment-info.component.scss'
})
export class PaymentInfoComponent {
   @Output() paymentInfoChanged = new EventEmitter<any>();

  paymentInformationForm: FormGroup;

  defaultFormValue = {
    bankName: ['', Validators.required],
    accountName: ['', Validators.required],
    accountNumber: ['', Validators.required]
  }

  constructor(private fb: FormBuilder) {
    this.paymentInformationForm = this.fb.group(this.defaultFormValue)
     // Emit the form value whenever there's a change
     this.paymentInformationForm.valueChanges.subscribe((value) => {
      this.paymentInfoChanged.emit(value);
    });
  }

}
