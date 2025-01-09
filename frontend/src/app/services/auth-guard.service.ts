import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  private isLoggedInCheck: boolean | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    if (this.isLoggedInCheck !== null) {
      // Use cached value for subsequent calls
      return of(this.isLoggedInCheck || this.router.parseUrl('/login'));
    }

    // Await authentication check
    return new Observable<boolean | UrlTree>((observer) => {
      this.authService.checkIsLoggedIn().then((isUserAuthenticated) => {
        this.isLoggedInCheck = isUserAuthenticated;
        if (isUserAuthenticated) {
          observer.next(true);
        } else {
          observer.next(this.router.parseUrl('/login'));
        }
        observer.complete();
      });
    });
  }
}
