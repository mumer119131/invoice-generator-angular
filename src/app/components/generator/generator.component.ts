import { Component, Input, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { MenuItems, MenuItemsList, AllDetails } from '../../types/generator.types';
import { FromAndToComponent } from '../from-and-to/from-and-to.component';
import { InvoiceDetailsComponent } from '../invoice-details/invoice-details.component';
import { PaymentInfoComponent } from '../payment-info/payment-info.component';
import { SummaryComponent } from '../summary/summary.component';
import { ItemsComponent } from "../../items/items.component";



@Component({
  selector: 'app-generator',
  imports: [ButtonComponent, FromAndToComponent, InvoiceDetailsComponent, PaymentInfoComponent, SummaryComponent, ItemsComponent],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss'
})
export class GeneratorComponent implements OnInit{
  defaultDetails = {
      name: 'Umer Khan',
      address:'Sample # 342 Jaranwala',
      zip: '37250',
      city: 'Faisalabad',
      country: 'Pakistan',
      email: 'mumer119131@gmail.com',
      phone: '+923456013122',
      other: [],
    }
  // toDetails = { name: 'Umer', address: '', zip: '', city: '', country: '', email: '', phone: '', other: [] };
  // fromDetails = { name: 'Umer', address: '', zip: '', city: '', country: '', email: '', phone: '', other: [] };

  toDetails = this.defaultDetails;
  fromDetails = this.defaultDetails;
  @Input() allDetails?: AllDetails;

  menuItems = [{ name: 'From & To', value: 'from&to' }, { name: 'Invoice Details', value: 'invoice' }, {name: 'Line Items', value: 'items'}, { name: 'Payment Info', value: 'payment' }, { name: 'Summary', value: 'summary' }] as MenuItemsList;
  currentSelectedMenu = signal<string>('payment')


  updateAllDetails() {
    if (this.allDetails) {
      this.allDetails.toDetails = this.toDetails;
      this.allDetails.fromDetails = this.fromDetails;
    }
  }

  handleToDetailsChange(details: any) {
    this.toDetails = details;
    console.log('Updated billing details:', this.toDetails);
    this.updateAllDetails();
    // You can also pass this data to other components or perform calculations here
  }
  handleFromDetailsChange(details: any) {
    console.log('Updated billing details:', this.fromDetails);
    this.fromDetails = details;
    this.updateAllDetails();
    // You can also pass this data to other components or perform calculations here
  }

  handleInvoiceDetailsChange(details: any) {
    console.log('Updated invoice details:', details);
    // You can also pass this data to other components or perform calculations here
  }
  getMenuClickHandler(value: MenuItems): () => void {
    this.currentSelectedMenu.set(value);
    return () => {
      
    }
  }

  ngOnInit() {
    this.updateAllDetails();
  }


}
