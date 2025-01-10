export interface ToDetails {
    name: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    email: string;
    phone: string;
  }
  
  export interface FromDetails {
    name: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    email: string;
    phone: string;
  }
  
  export interface PaymentInfo {
    bankName: string;
    accountName: string;
    accountNumber: string;
  }
  
  export interface InvoiceDetails {
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    currency: string;
    invoiceLogo: string;
  }
  
  export interface Item {
    id: null;
    name: string;
    quantity: number;
    price: number;
    description: string;
  }
  
  export interface SummaryDetails {
    tax: number;
    taxType: string;
    discount: number;
    discountType: string;
    shipping: number;
    shippingType: string;
    total: number;
    additionalInfo: string;
    paymentTerms: string;
    signature: string;
    subTotal: number;
    isTaxValue: boolean;
    isDiscountValue: boolean;
    isShippingValue: boolean;
    isTotalInWords: boolean;
  }
  
  export interface InvoiceData {
    toDetails: ToDetails | null;
    fromDetails: FromDetails | null;
    paymentInfo: PaymentInfo | null;
    invoiceDetails: InvoiceDetails | null;
    items: Item[] | null;
    summaryDetails: SummaryDetails | null;
  }
  