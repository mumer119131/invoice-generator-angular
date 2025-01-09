import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  private isLoggedInCheck: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (this.isLoggedInCheck) return true;
    this.isLoggedInCheck = true;
    const isUserAuthenticated = await this.authService.checkIsLoggedIn();
    if (!isUserAuthenticated && this.router.url !== '/login') {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
