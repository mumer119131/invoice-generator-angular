import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InvoiceService } from '../../services/invoice-state-service.service';

@Component({
  selector: 'app-actions',
  imports: [MatIconModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class ActionsComponent {


  constructor(private invoiceService: InvoiceService) { }

  // generate PDF
  generatePDF() {
    this.invoiceService.generatePDF();
  }
  exportInvoice() {
    this.invoiceService.exportJSON();
  }
}
