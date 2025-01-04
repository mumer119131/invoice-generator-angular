import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { MenuItems, MenuItemsList } from '../../types/generator.types';
import { FromAndToComponent } from '../from-and-to/from-and-to.component';

@Component({
  selector: 'app-generator',
  imports: [ButtonComponent, FromAndToComponent],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss'
})
export class GeneratorComponent {
  menuItems = [{ name: 'From & To', value: 'from&to' }, { name: 'Invoice Details', value: 'invoice' }, { name: 'Payment Info', value: 'payment' }, { name: 'Summary', value: 'summary' }] as MenuItemsList;
  currentSelectedMenu = signal<string>('from&to')


  getMenuClickHandler(value: MenuItems): () => void {
    console.log('Menu clicked', value);
    return () => this.handleMenuClick(value);
  }

  handleMenuClick = (item: MenuItems) => {
    this.currentSelectedMenu.set(item);
    console.log('Menu clicked', item);
  }

}
