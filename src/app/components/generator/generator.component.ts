import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { MenuItems, MenuItemsList } from '../../types/generator.types';
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
export class GeneratorComponent{
  
  menuItems = [{ name: 'From & To', value: 'from&to' }, { name: 'Invoice Details', value: 'invoice' }, {name: 'Line Items', value: 'items'}, { name: 'Payment Info', value: 'payment' }, { name: 'Summary', value: 'summary' }] as MenuItemsList;
  currentSelectedMenu = signal<string>('from&to')

  getMenuClickHandler(menuItem: MenuItems) {
      this.currentSelectedMenu.set(menuItem)
  }

  
}
