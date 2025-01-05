

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

export interface AllDetails {
    toDetails: BillingInfo;
    fromDetails: BillingInfo;
}

export interface Items {
    id: number;
    name: string;
    quantity: number;
    price: number;
    total: number;
    description: string;
}