
import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { GeneratorComponent } from '../components/generator/generator.component';
import { PreviewComponent } from '../components/preview/preview.component';
import { AuthService } from '../services/auth.service';
import { ActionsComponent } from "../components/actions/actions.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, GeneratorComponent, PreviewComponent, ActionsComponent],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})

export class InvoiceComponent {
  invoiceId!: string;
  constructor(private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.params['id'] || '';
  }
}
