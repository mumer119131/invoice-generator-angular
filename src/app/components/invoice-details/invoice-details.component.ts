import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InvoiceService } from '../../services/invoice-state-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { currencyOptions } from '../../data/generator';

@Component({
  selector: 'app-invoice-details',
  imports: [ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent {
  invoiceDetailsForm: FormGroup;
  currencyOptions = Object.entries(currencyOptions).map(([key, value]) => ({ key, value }));
  constructor(private invoiceService: InvoiceService) {
    this.invoiceDetailsForm = this.invoiceService.getForm('invoiceDetails');

    this.invoiceDetailsForm.valueChanges.subscribe((value) => {
      this.invoiceService.updateInvoiceData({ invoiceDetails: value });
    });
  }

  handleLogoChange(event: any): void {
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      // Store the Base64 string in the form control
      this.invoiceDetailsForm.controls['invoiceLogo'].setValue(e.target.result);
    };
  
    // Read the selected file as a data URL (Base64)
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
