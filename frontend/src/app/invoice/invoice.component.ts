
import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { GeneratorComponent } from '../components/generator/generator.component';
import { PreviewComponent } from '../components/preview/preview.component';
import { AuthService } from '../services/auth.service';
import { ActionsComponent } from "../components/actions/actions.component";
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../services/invoice-state-service.service';
import { BreadcrumbsComponent } from "../components/common/breadcrumbs/breadcrumbs.component";
import { AllDetails } from '../types/generator.types';
import { InvoiceHandlerService } from '../services/invoice-handler.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, GeneratorComponent, PreviewComponent, ActionsComponent, BreadcrumbsComponent],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})

export class InvoiceComponent {
  invoiceId!: string;
  invoice!: AllDetails;
  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService, private invoiceHandlerService: InvoiceHandlerService) {
    
  }
  breadCrumbMenuItems: { name: string; link: string; }[] = []
  
  
  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.params['id'] || '';
    this.invoiceService.loadInvoiceData(this.invoiceId)
    if(this.invoiceId){
      this.invoiceService.setInvoiceId(this.invoiceId);
      this.breadCrumbMenuItems = [
        {
          name : 'Dashboard',
          link : '/dashboard'
        },
        {
          name : 'Invoice',
          link : `/invoice/${this.invoiceId}`
        },
        {
          name: this.invoiceId,
          link: `/invoice/${this.invoiceId}`
        }
      ]
    }
  }

  ngOnDestroy(): void {
    this.invoiceService.reset();
  }
}
