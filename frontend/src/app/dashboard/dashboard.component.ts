import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { ButtonComponent } from "../components/button/button.component";
import { MatIconModule } from '@angular/material/icon';
import { PopupComponent } from "../components/popup/popup.component";
import { InvoiceService } from '../services/invoice-state-service.service';
import { SpinnerComponent } from "../components/common/spinner/spinner.component";
import { Router } from '@angular/router';
import { InvoiceHandlerService } from '../services/invoice-handler.service';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, ButtonComponent, MatIconModule, SpinnerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  router = inject(Router)
  isLoadingNewInvoice = false;
  constructor(private invoiceService: InvoiceService, private invoiceHandlerService: InvoiceHandlerService) { }

  async handleNewInvoice(): Promise<void> {
    this.isLoadingNewInvoice = true;
    const invoice = await this.invoiceHandlerService.createNewInvoice();
    if(invoice){
      this.router.navigate(['/invoice', invoice]);
    }
    this.isLoadingNewInvoice = false;
  }
}
