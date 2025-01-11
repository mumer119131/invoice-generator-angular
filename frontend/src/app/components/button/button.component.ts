import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnInit {
  className: string = '';
  @Input() class = ''
  @Input() variant: string = 'default'
  @Input() isDisabled = false

  clickHandler(event: MouseEvent): void {
  }

  ngOnInit(): void {
    if (this.variant === 'cta') {
      this.className = `dark:bg-white bg-black dark:text-black text-white border-[1px] border-gray-800 px-4 min-w-[5rem] py-[6px] rounded-lg text-sm outfit-font ${this.class} disabled:opacity-50`;
    }else{
      this.className = `border-[1px] border-gray-900 p-2 rounded-lg text-sm outfit-font ${this.class}`;
    }

    
  }
}
