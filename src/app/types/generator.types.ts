

export type MenuItems = 'from&to' | 'invoice' | 'items' | 'payment' | 'summary';

export type MenuItemsList = Array<{ name: string, value: MenuItems }>;


export type BillingInfo = {
    name: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    email: string;
    phone: string;
    other: Array<{ key: string, value: string }>;
}

export type PaymentInfo = {
    accountNumber: string;
    bankName: string;
    accountName: string;
}

export type InvoiceDetails = {
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    currency: string;
    invoiceLogo?: string;
}
export interface AllDetails {
    toDetails: BillingInfo;
    fromDetails: BillingInfo;
    paymentInfo: PaymentInfo;
    invoiceDetails: InvoiceDetails;
    items: Array<Items>;
};

export interface Items {
    id: number;
    name: string;
    quantity: number;
    price: number;
    total: number;
    description: string;
}