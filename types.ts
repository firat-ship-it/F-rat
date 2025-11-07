export interface User {
  name: string;
  email: string;
}

export enum CabinetModel {
  ALVIC_LUXE = 'Alvic Luxe (High Gloss)',
  ALVIC_ZENIT = 'Alvic Zenit (Super Matt)',
  ALVIC_SYNCRON = 'Alvic Syncron (Textured)',
  EGEPRES = 'Egepres (Standard)',
}

export enum SurfaceColor {
  GLOSSY_WHITE = 'Parlak Beyaz',
  MATTE_BLACK = 'Mat Siyah',
  WOOD_GRAIN = 'Ahşap Dokulu',
  ANTHRACITE_GRAY = 'Antrasit Gri',
}

export interface OrderItem {
  id: string;
  width: number;
  height: number;
  quantity: number;
  model: CabinetModel;
  color: SurfaceColor;
  notes?: string;
}

export interface Order {
  orderId: string;
  trackingNumber: string;
  userEmail: string;
  items: OrderItem[];
  status: 'Pending' | 'In Production' | 'Completed' | 'Shipped';
  createdAt: Date;
  address?: string;
  billingInfo?: string;
  price: number;
  file?: {
    name: string;
    // In a real app, this would be a URL to Google Drive or other storage
    url: string; 
  };
}
