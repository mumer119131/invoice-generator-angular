import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { InvoiceService } from '../services/invoice-state-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-items',
  imports: [ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  itemsFormArray: FormArray;

  constructor(private invoiceService: InvoiceService) {
    // Retrieve the FormArray from the service
    this.itemsFormArray = this.invoiceService.getItemsFormArray();
    
  }
  get itemsForm(): FormGroup {
    return this.invoiceService.getItemsForm();
  }
  
  addItem(): void {
    // Use the service to add an item
    this.invoiceService.addItem({});
  }

  removeItem(index: number): void {
    // Use the service to remove an item
    this.invoiceService.removeItem(index);
  }

  calculateTotal(index: number): void {
    // Calculate the total for a specific item
    const itemGroup: FormGroup = this.itemsFormArray.at(index) as FormGroup;
    const quantity = itemGroup.get('quantity')?.value || 0;
    const price = itemGroup.get('price')?.value || 0;
    itemGroup.get('total')?.setValue(quantity * price, { emitEvent: false });
  }
}