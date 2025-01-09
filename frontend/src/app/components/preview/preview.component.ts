import { Component, input, OnInit } from '@angular/core';
import { AllDetails } from '../../types/generator.types';
import { InvoiceService } from '../../services/invoice-state-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-preview',
  imports: [CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent{
  allDetails: AllDetails | null = null;
  constructor(private invoiceService: InvoiceService) {
    
  }

  ngOnInit(): void {
    // Subscribe to real-time updates
    this.invoiceService.getInvoiceDataObservable().subscribe((data) => {
      console.log(data);
      this.allDetails = data;
    });
  }
  
}
