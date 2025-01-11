import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AllDetails, BillingInfo, InvoiceDetails, PaymentInfo } from '../types/generator.types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import { InvoiceHandlerService } from './invoice-handler.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoiceDetailsForm: FormGroup;
  private paymentInformationForm: FormGroup;
  private fromDetailsForm: FormGroup;
  private toDetailsForm: FormGroup;
  private itemsForm: FormGroup;
  private summaryDetailsForm: FormGroup;
  private invoiceId = '';
  private invoiceDataSubject = new BehaviorSubject<AllDetails | null>(null);
  invoiceDetails$ = new BehaviorSubject<any>(null);
  paymentInfo$ = new BehaviorSubject<any>(null);
  fromDetails$ = new BehaviorSubject<any>(null);
  toDetails$ = new BehaviorSubject<any>(null);
  items$ = new BehaviorSubject<any[]>([]);
  summaryDetails$ = new BehaviorSubject<any>(null);
  

  constructor(private fb: FormBuilder, private invoiceHandleService : InvoiceHandlerService) {

    
    // Initialize forms
    this.invoiceDetailsForm = this.initInvoiceDetailsForm();
    this.paymentInformationForm = this.initPaymentInfoForm();
    this.fromDetailsForm = this.initDetailsForm();
    this.toDetailsForm = this.initDetailsForm();
    this.itemsForm = this.initItemsForm();
    this.summaryDetailsForm = this.initSummaryDetailsForm();

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

  setInvoiceId(id: string) {
    this.invoiceId = id;
  }

  private initSummaryDetailsForm(): FormGroup {
    return this.fb.group({
      tax: [0, Validators.required],
      taxType: ['value', Validators.required],
      discount: [0, Validators.required],
      discountType: ['value', Validators.required],
      shipping: [0, Validators.required],
      shippingType: ['value', Validators.required],
      total: [0, Validators.required],
      additionalInfo: ['', Validators.required],
      paymentTerms: ['', Validators.required],
      signature: ['', Validators.required],
      subTotal: [0, Validators.required],
      isTaxValue: [false],
      isDiscountValue: [false],
      isShippingValue: [false],
      isTotalInWords: [false],
    });
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
      summaryDetails: updatedData['summaryDetails'] ?? currentData?.['summaryDetails'] ?? {} as any,
    };
    this.invoiceDataSubject.next(updatedInvoiceData);

    this.invoiceHandleService.saveInvoice(updatedInvoiceData, this.invoiceId);
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

  setSummaryDetails(data: any) {
    this.updateInvoiceData({ summaryDetails: data });
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

  getSubTotal(): number {
    const items = this.getItemsFormArray().value;
    return items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  }

  calculateTotal(): void {
    const subTotal = this.getSubTotal();
    var tax = this.summaryDetailsForm.value.isTaxValue ? this.summaryDetailsForm.value.tax : 0;
    if(this.summaryDetailsForm.value.taxType === 'percentage') {
      tax = subTotal * (tax / 100);
    }
    var discount = this.summaryDetailsForm.value.isDiscountValue ? this.summaryDetailsForm.value.discount : 0;
    if(this.summaryDetailsForm.value.discountType === 'percentage') {
      discount = subTotal * (discount / 100);
    }
    var shipping = this.summaryDetailsForm.value.isShippingValue ? this.summaryDetailsForm.value.shipping : 0;
    if(this.summaryDetailsForm.value.shippingType === 'percentage') {
      shipping = subTotal * (shipping / 100);
    }
    const total = subTotal + tax - discount + shipping;
    this.summaryDetailsForm.patchValue({ total }, { emitEvent: false });
  }
  updateSubTotal(): void {
    this.calculateTotal();
    const subTotal = this.getSubTotal();
    this.summaryDetailsForm.patchValue({ subTotal }, { emitEvent: false });
  }
  getForm(type: 'invoiceDetails' | 'paymentInfo' | 'fromDetails' | 'toDetails' | 'summaryDetails'): FormGroup {
    switch (type) {
      case 'invoiceDetails':
        return this.invoiceDetailsForm;
      case 'paymentInfo':
        return this.paymentInformationForm;
      case 'fromDetails':
        return this.fromDetailsForm;
      case 'toDetails':
        return this.toDetailsForm;
      case 'summaryDetails':
        return this.summaryDetailsForm;
      default:
        throw new Error('Unknown form type');
    }
  }

  generatePDF(): void {
    const invoiceData = this.invoiceDataSubject.value;
    console.log(invoiceData);
    if (!invoiceData) {
      console.error('No data available for PDF generation');
      return;
    }

    const doc = new jsPDF();

    
  }


  exportJSON(): void {
    const invoiceData = this.invoiceDataSubject.value;
    if (!invoiceData) {
      console.error('No data available for JSON export');
      return;
    }
  
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(invoiceData, null, 2)
    )}`;
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'invoice-data.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  loadJSON(file: File): void {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result as string;
      try {
        const parsedData = JSON.parse(data);
        this.invoiceDataSubject.next(parsedData);
      } catch (error) {
        console.error('Error parsing JSON data', error);
      }
    };
    reader.readAsText(file);
  }


  loadInvoiceData(invoiceId: string): void {
    this.invoiceHandleService.getInvoice(invoiceId).then((invoice) => {
      if (invoice) {
      this.invoiceDataSubject.next(invoice);

      // Update forms with new data
      this.invoiceDetailsForm.patchValue(invoice.invoiceDetails);
      this.paymentInformationForm.patchValue(invoice.paymentInfo);
      this.fromDetailsForm.patchValue(invoice.fromDetails);
      this.toDetailsForm.patchValue(invoice.toDetails);
      this.summaryDetailsForm.patchValue(invoice.summaryDetails);

      // Clear and repopulate items form array
      const itemsArray = this.getItemsFormArray();
      itemsArray.clear();
      invoice.items.forEach((item: any) => {
        itemsArray.push(this.fb.group({
        id: [item.id || null],
        name: [item.name || '', Validators.required],
        quantity: [item.quantity || 1, [Validators.required, Validators.min(1)]],
        price: [item.price || 0, [Validators.required, Validators.min(0)]],
        total: [{ value: item.total || 0, disabled: true }],
        description: [item.description || ''],
        }));
      });
      this.updateItems();
      }
    });
  }
  

  reset(){
    this.invoiceDataSubject.next(null);
    this.invoiceDetailsForm.reset({}, { emitEvent: false });
    this.paymentInformationForm.reset({}, { emitEvent: false });
    this.fromDetailsForm.reset({}, { emitEvent: false });
    this.toDetailsForm.reset({}, { emitEvent: false });
    this.itemsForm.reset({}, { emitEvent: false });
    this.summaryDetailsForm.reset({}, { emitEvent: false });
    this.getItemsFormArray().clear();
  }
}




