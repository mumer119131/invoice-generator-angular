import { Component } from '@angular/core';
import { Router } from 'express';
declare var google: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  


  // decodeJWTToken(token: string) {
  //   return JSON.parse(atob(token.split('.')[1]));
  // }
  // handleCredentialResponse(response: any) {
  //   if (response.credential) {
  //     const jwtToken = response.credential;
  //     const decodedToken = this.decodeJWTToken(jwtToken);
  //     const user = {
  //       email: decodedToken.email,
  //       name: decodedToken.name,
  //       picture: decodedToken.picture,
  //       sub: decodedToken.sub,
  //     };
  //     localStorage.setItem('user', JSON.stringify(user));
  //     window.location.href = '/';
  //   }
  // }
 
}
