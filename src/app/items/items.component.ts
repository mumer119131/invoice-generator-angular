import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Items } from '../types/generator.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
})
export class ItemsComponent {
  @Output() invoiceItemsChanged = new EventEmitter<any>();
  itemsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.itemsForm = this.fb.group({
      items: this.fb.array([]),
    });

    // Initialize with default items
    this.addItem({
      id: 1,
      name: 'Item 1',
      quantity: 1,
      price: 100,
      total: 100,
      description: 'Description of item 1',
    });

    // Emit the form value whenever there's a change
    this.itemsForm.valueChanges.subscribe((value) => {
      this.invoiceItemsChanged.emit(value.items);
    });
  }

  // Getter for items FormArray
  get items(): FormArray {
    return this.itemsForm.get('items') as FormArray;
  }

  // Add an item to the FormArray
  addItem(item: Partial<Items> = {}): void {
    console.log('Adding item:', item);
    this.items.push(
      this.fb.group({
        id: [item.id || null],
        name: [item.name || '', Validators.required],
        quantity: [item.quantity || 1, [Validators.required, Validators.min(1)]],
        price: [item.price || 0, [Validators.required, Validators.min(0)]],
        total: [{ value: item.total || 0, disabled: true }],
        description: [item.description || ''],
      })
    );
    console.log(this.items.controls)
  }

  // Remove an item from the FormArray
  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  // Calculate the total for an item
  calculateTotal(index: number): void {
    const itemGroup = this.items.at(index) as FormGroup;
    const quantity = itemGroup.get('quantity')?.value || 0;
    const price = itemGroup.get('price')?.value || 0;
    itemGroup.get('total')?.setValue(quantity * price, { emitEvent: false });
  }
}
