import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  isDarkMode = true
  constructor(private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit() {
   // Check if running in the browser
   if (isPlatformBrowser(this.platformId)) {
    this.isDarkMode = document.documentElement.classList.contains('dark');
  }
  }

  toggleTheme(){
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleDarkMode(this.isDarkMode)
  }
}
