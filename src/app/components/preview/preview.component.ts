import { Component, input, OnInit } from '@angular/core';
import { AllDetails } from '../../types/generator.types';

@Component({
  selector: 'app-preview',
  imports: [],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent implements OnInit {
  allDetails = input.required<AllDetails>();
  constructor() {
  }

  ngOnInit() {
    console.log('All details:', this.allDetails());
  }
  
}
