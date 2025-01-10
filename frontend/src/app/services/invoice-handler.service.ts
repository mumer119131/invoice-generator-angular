import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class InvoiceHandlerService {

  constructor() { }


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
}
