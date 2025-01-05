import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { currencyOptions } from '../../data/generator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-details',
  imports: [ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss'
})
export class InvoiceDetailsComponent {
  @Output() invoiceDetailsChanged = new EventEmitter<any>();
  currencyOptions = Object.entries(currencyOptions).map(([key, value]) => ({ key, value }));
  defaultCurrencyKey = 'USD'
  invoiceDetailsForm :FormGroup;
  defaultFormValue = {
    invoiceNumber: ['', Validators.required],
    invoiceDate: ['', Validators.required],
    dueDate: ['', Validators.required],
    currency: [this.defaultCurrencyKey, Validators.required],
    invoiceLogo: ['', Validators.required],
  }
  constructor(private fb: FormBuilder) {
    this.invoiceDetailsForm = this.fb.group(this.defaultFormValue)
     // Emit the form value whenever there's a change
     this.invoiceDetailsForm.valueChanges.subscribe((value) => {
      this.invoiceDetailsChanged.emit(value);
    });
  }

  handleLogoChange(event: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.invoiceDetailsForm.controls['invoiceLogo'].setValue(e.target.result);
    }
    reader.readAsDataURL(event.target.files[0]);
  }
}
