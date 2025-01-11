import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class InvoiceHandlerService {

  constructor(private router: Router) { }


  async createNewInvoice(): Promise<string | boolean> {
    try{
      const response = await axios.get('http://localhost:3000/api/invoice/create', {withCredentials: true});
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
      const response = await axios.get(`http://localhost:3000/api/invoice/${invoiceId}`, {withCredentials: true});
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
      
      const response = await axios.post('http://localhost:3000/api/invoice/save', {invoice, invoiceId}, {withCredentials: true});
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
      const response = await axios.get('http://localhost:3000/api/invoice/', {withCredentials: true});
      if(response.status === 200){
        return response.data.invoices;
      }
    }catch(e){
      console.error(e);
    }
    return false;
  }
  

}
