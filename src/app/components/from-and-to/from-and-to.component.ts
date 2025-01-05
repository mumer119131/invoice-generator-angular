import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InvoiceService } from '../../services/invoice-state-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { billingDetailsFieldsDefault } from '../../data/generator';

@Component({
  selector: 'app-from-and-to',
  imports: [ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './from-and-to.component.html',
  styleUrls: ['./from-and-to.component.scss'],
})
export class FromAndToComponent {
  fromDetailsForm: FormGroup;
  toDetailsForm: FormGroup;

  billingDetailsFields = billingDetailsFieldsDefault;

  constructor(private invoiceService: InvoiceService) {
    this.fromDetailsForm = this.invoiceService.getForm('fromDetails');
    this.toDetailsForm = this.invoiceService.getForm('toDetails');
  }
}
