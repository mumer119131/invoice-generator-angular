import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  private userSubscription!: Subscription;
  user : User | null = null;
  isDarkMode = true
  constructor(private themeService: ThemeService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.getUser().subscribe((user) => {
      console.log(user);
      this.user = user;
    });

    // Check if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = document.documentElement.classList.contains('dark');
    }
  }

  ngOnDestroy():void {

    this.userSubscription.unsubscribe();
  }

  logout(){
    console.log('logout');
    this.authService.logout();
  }
  toggleTheme(){
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleDarkMode(this.isDarkMode)
  }
}
