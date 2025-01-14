import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.dynamic';

@Injectable({
  providedIn: 'root'
})
export class InvoiceHandlerService {

  private BACKEND_URL = environment.BACKEND_URL;
  constructor(private router: Router) { }


  async createNewInvoice(): Promise<string | boolean> {
    try{
      console.log(process.env);
      const response = await axios.get(`${this.BACKEND_URL}/api/invoice/create`, {withCredentials: true});
      if(response.status === 200){
        return response.data.invoice._id;
      }
    }catch(e){
      console.error(e);
    }
    return false;
  }


  async getInvoice(invoiceId: string): Promise<any> {
    try{
      const response = await axios.get(`${this.BACKEND_URL}/api/invoice/${invoiceId}`, {withCredentials: true});
      if(response.status === 200){
        return response.data.invoice;
      }
    }catch(e){
      console.error(e);
    }
    return false;
  }


  async saveInvoice(invoice: any, invoiceId: string): Promise<boolean> {
    console.log(invoice);
    try{
      
      const response = await axios.post(`${this.BACKEND_URL}/api/invoice/save`, {invoice, invoiceId}, {withCredentials: true});
      if(response.status === 200){
        return true;
      }
    }catch(e){
      console.error(e);
    }
    return false;
  }

  async getInvoices(): Promise<any> {
    try{
      const response = await axios.get(`${this.BACKEND_URL}/api/invoice/`, {withCredentials: true});
      if(response.status === 200){
        return response.data.invoices;
      }
    }catch(e){
      console.error(e);
    }
    return false;
  }
  

}
