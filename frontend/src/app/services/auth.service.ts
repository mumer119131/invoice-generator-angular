import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../types/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  private isAuthenticated :boolean | null = null;
  
  
  async checkIsLoggedIn(): Promise<boolean | null > {
    if (this.isAuthenticated !== null) {
      return this.isAuthenticated;
    }
  
    try{
      const response = await axios.get('http://localhost:3000/api/auth/check', {withCredentials: true});
      if(response.data.user){
        this.user.next(response.data.user);
        this.isAuthenticated = true;
        return true;
      }
    }catch(e){
      console.log(e);
      this.isAuthenticated = true;
    }
    this.isAuthenticated = false;
    return false;}



  getUser() {
    return this.user.asObservable();
  }

  async logout() {
    try {
      await axios.get('http://localhost:3000/api/auth/logout', {withCredentials: true});
      this.isAuthenticated = false;
      this.user.next(null);
      return true;
    } catch (e) {
      console.log(e);
    }
    return false;
  }
  constructor() { }
}
