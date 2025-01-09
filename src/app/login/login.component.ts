import { Component, inject, OnInit } from '@angular/core';
import { Router } from 'express';
declare var google: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  ngOnInit(): void {
    console.log(google)
    google.accounts.id.initialize({
      client_id: '927369059480-tt4n66cd8hoa7gcn2m0v2kvlf17j84ap.apps.googleusercontent.com',
      callback : (response : any) =>{
        this.handleLogin(response)
      }
    });
    google.accounts.id.renderButton(document.getElementById('google-button'), {
      theme : 'filled_blue',
      size : 'large',
      shape : 'rectangular',
      text : 'login_with',
      width: 350, 
    });
  }
  private decodeToken(token : string) : any {
    return JSON.parse(atob(token.split('.')[1]));
  }
  handleLogin(response : any){
    if(response) {
      const payload = this.decodeToken(response.credential);
      console.log(payload)
      sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
      this.router.navigate(['/']);
    }
  }
}
