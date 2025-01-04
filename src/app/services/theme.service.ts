import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeKey = 'theme';

  constructor(@Inject(PLATFORM_ID) private platformId: Object ) {}

  // Toggle dark mode
  toggleDarkMode(isDarkMode: boolean): void {
    if(!isPlatformBrowser(this.platformId)) {
      return;
    }
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem(this.themeKey, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(this.themeKey, 'light');
    }
  }

  // Load the theme from localStorage
  loadTheme(): void {
    if(isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem(this.themeKey);
      const isDark = savedTheme === 'dark';
      this.toggleDarkMode(isDark);
    }
  }
}
