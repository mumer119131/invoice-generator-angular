import { Component } from '@angular/core';
import { InvoiceService } from '../../services/invoice-state-service.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-summary',
  imports: [ReactiveFormsModule, MatSlideToggleModule, MatIconModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent { 
  summaryForm : FormGroup;
  isTaxValue: boolean = true;
  isDiscountValue: boolean = true;
  isShippingValue: boolean = true;
  isTotalInWords: boolean = true;
  visibilityFields: any;

  constructor(private invoiceService: InvoiceService) {
    this.summaryForm = this.invoiceService.getForm('summaryDetails');
    this.summaryForm.valueChanges.subscribe((value) => {
      this.invoiceService.updateInvoiceData({ summaryDetails: value });
      this.invoiceService.calculateTotal();
    });

    this.visibilityFields = [
      {
        key: 'tax',
        formControl: this.summaryForm.get('isTaxValue'),
        isCheck: this.isTaxValue,
      },
      {
        key: 'discount',
        formControl: this.summaryForm.get('isDiscountValue'),
        isCheck: this.isDiscountValue,
      },
      {
        key: 'shipping',
        formControl: this.summaryForm.get('isShippingValue'),
        isCheck: this.isShippingValue,
      },
      {
        key: 'totalInWords',
        formControl: this.summaryForm.get('isTotalInWords'),
        isCheck: this.isTotalInWords,
      },
    ];
  }


  handleVisibilityChange(event: any, type: string) {
    const isChecked : boolean = event.target.checked;
    switch (type) {
      case 'tax':
        this.isTaxValue = isChecked;
        break;
      case 'discount':
        this.isDiscountValue = isChecked;
        break;
      case 'shipping':
        this.isShippingValue = isChecked;
        break;
      case 'totalInWords':
        this.isTotalInWords = isChecked;
        break;
    }
    if(type === 'tax' || type === 'discount' || type === 'shipping') {
      this.calculateTotal();
    }
    console.log(this.isTaxValue, this.isDiscountValue, this.isShippingValue, this.isTotalInWords);
  }
  // Define the form group
  
  calculateTotal() {
    const subTotal = this.invoiceService.getSubTotal();
    const tax = this.isTaxValue ? this.summaryForm.value.tax : 0;
    const discount = this.isDiscountValue ? this.summaryForm.value.discount : 0;
    const shipping = this.isShippingValue ? this.summaryForm.value.shipping : 0;
    const total = subTotal + tax - discount + shipping;
    this.summaryForm.patchValue({ total });
  }

  handleSignatureChange(event: any){
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.summaryForm.controls['signature'].setValue(e.target.result);
    };
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  }



}
