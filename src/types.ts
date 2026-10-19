export type ProductCategory = 'all' | 'coffee' | 'macchiato' | 'toast' | 'savoury-toast' | 'sweet-toast';

export interface Product {
  id: string;
  name: string;
  category: 'coffee' | 'macchiato' | 'savoury-toast' | 'sweet-toast';
  seriesName: string;
  price: number;
  description: string;
  stock: number;
  available: boolean;
  bestSeller?: boolean;
  image: string;
  temperature?: 'iced' | 'hot' | 'both';
  portionNote?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
  temperatureChoice?: 'iced' | 'hot';
}

export type OrderStatus = 'waiting_payment' | 'paid' | 'preparing' | 'ready' | 'completed';

export interface Order {
  id: string;
  customerId?: string;
  customerName: string;
  orderType: 'dine_in' | 'takeaway';
  tableNumber?: string;
  customerPhone?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'QRIS';
  paymentStatus: 'UNPAID' | 'PAID';
  orderStatus: OrderStatus;
  createdAt: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
  defaultTable?: string;
  joinedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'staff' | 'manager' | 'owner';
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  approved: boolean;
  favoriteItem?: string;
}

export interface OutletInfo {
  name: string;
  tagline: string;
  concept: string;
  address: string;
  area: string;
  operatingHours: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  tiktok: string;
  mapsUrl: string;
}
