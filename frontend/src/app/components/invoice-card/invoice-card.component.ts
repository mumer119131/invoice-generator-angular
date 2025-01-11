import { Component, Input } from '@angular/core';
import { AllDetails } from '../../types/generator.types';
import { CardComponent } from "../common/card/card.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './invoice-card.component.html',
  styleUrl: './invoice-card.component.scss'
})
export class InvoiceCardComponent {
  @Input() invoice!: AllDetails;
}
