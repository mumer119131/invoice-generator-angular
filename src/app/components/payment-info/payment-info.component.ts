import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice-state-service.service';
@Component({
  selector: 'app-payment-info',
  imports: [ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss'],
})
export class PaymentInfoComponent {
  paymentInformationForm: FormGroup;

  constructor(private invoiceService: InvoiceService) {
    this.paymentInformationForm = this.invoiceService.getForm('paymentInfo');
  }
}