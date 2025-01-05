import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AllDetails, BillingInfo, InvoiceDetails, PaymentInfo } from '../types/generator.types';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoiceDetailsForm: FormGroup;
  private paymentInformationForm: FormGroup;
  private fromDetailsForm: FormGroup;
  private toDetailsForm: FormGroup;
  private itemsForm: FormGroup;

  private invoiceDataSubject = new BehaviorSubject<AllDetails | null>(null);
  invoiceDetails$ = new BehaviorSubject<any>(null);
  paymentInfo$ = new BehaviorSubject<any>(null);
  fromDetails$ = new BehaviorSubject<any>(null);
  toDetails$ = new BehaviorSubject<any>(null);
  items$ = new BehaviorSubject<any[]>([]);

  constructor(private fb: FormBuilder) {
    // Initialize forms
    this.invoiceDetailsForm = this.initInvoiceDetailsForm();
    this.paymentInformationForm = this.initPaymentInfoForm();
    this.fromDetailsForm = this.initDetailsForm();
    this.toDetailsForm = this.initDetailsForm();
    this.itemsForm = this.initItemsForm();
    

    // Subscribe to form changes and emit updates
    this.invoiceDetailsForm.valueChanges.subscribe((value) =>
      this.invoiceDetails$.next(value)
    );
    this.paymentInformationForm.valueChanges.subscribe((value) =>
      this.paymentInfo$.next(value)
    );
    this.fromDetailsForm.valueChanges.subscribe((value) =>
      this.fromDetails$.next(value)
    );
    this.toDetailsForm.valueChanges.subscribe((value) =>
      this.toDetails$.next(value)
    );
    this.itemsForm.get('items')?.valueChanges.subscribe((value) =>
      this.items$.next(value)
    );
  }

  // Public getter to access itemsForm
  getItemsForm(): FormGroup {
    return this.itemsForm;
  }

  private initInvoiceDetailsForm(): FormGroup {
    return this.fb.group({
      invoiceNumber: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      currency: ['USD', Validators.required],
      invoiceLogo: ['', Validators.required],

    });
  }

  private initPaymentInfoForm(): FormGroup {
    return this.fb.group({
      bankName: ['', Validators.required],
      accountName: ['', Validators.required],
      accountNumber: ['', Validators.required],
    });
  }

  private initDetailsForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  private initItemsForm(): FormGroup {
    return this.fb.group({
      items: this.fb.array([]),
    });
  }

  getInvoiceDataObservable() {
    return this.invoiceDataSubject.asObservable();
  }



  updateInvoiceData(updatedData: Partial<any>) {
    const currentData = this.invoiceDataSubject.value;
    const updatedInvoiceData: AllDetails = {
      ...currentData,
      ...updatedData,
      toDetails: updatedData['toDetails'] ?? currentData?.['toDetails'] ?? {} as BillingInfo,
      fromDetails: updatedData['fromDetails'] ?? currentData?.['fromDetails'] ?? {} as BillingInfo,
      paymentInfo: updatedData['paymentInfo'] ?? currentData?.['paymentInfo'] ?? {} as PaymentInfo,
      invoiceDetails: updatedData['invoiceDetails'] ?? currentData?.['invoiceDetails'] ?? {} as InvoiceDetails,
      items: updatedData['items'] ?? currentData?.['items'] ?? [] as any[],
    };
    this.invoiceDataSubject.next(updatedInvoiceData);
  }
  setFromData(data: any) {
    this.updateInvoiceData({ from: data });
  }

  setToData(data: any) {
    this.updateInvoiceData({ to: data });
  }

  setPaymentInfo(data: any) {
    this.updateInvoiceData({ paymentInfo: data });
  }
  getItemsFormArray(): FormArray {
    return this.itemsForm.get('items') as FormArray;
  }

  addItem(item: any): void {
    const items = this.getItemsFormArray();
    items.push(
      this.fb.group({
        id: [item.id || null],
        name: [item.name || '', Validators.required],
        quantity: [item.quantity || 1, [Validators.required, Validators.min(1)]],
        price: [item.price || 0, [Validators.required, Validators.min(0)]],
        total: [{ value: item.total || 0, disabled: true }],
        description: [item.description || ''],
      })
    );
    this.updateItems();
  }

  removeItem(index: number): void {
    const items = this.getItemsFormArray();
    items.removeAt(index);
    this.updateItems();
  }

  private updateItems(): void {
    const items = this.getItemsFormArray().value;
    this.items$.next(items);
  }

  getForm(type: 'invoiceDetails' | 'paymentInfo' | 'fromDetails' | 'toDetails'): FormGroup {
    switch (type) {
      case 'invoiceDetails':
        return this.invoiceDetailsForm;
      case 'paymentInfo':
        return this.paymentInformationForm;
      case 'fromDetails':
        return this.fromDetailsForm;
      case 'toDetails':
        return this.toDetailsForm;
      default:
        throw new Error('Unknown form type');
    }
  }
}
