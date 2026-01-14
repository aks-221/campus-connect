export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'vendeur' | 'admin';
  createdAt: Date;
}

export interface Vendeur extends User {
  role: 'vendeur';
  pavilion: string;
  chambre: string;
  isVerified: boolean;
  subscriptionStatus: 'actif' | 'expire' | 'essai';
  subscriptionEndDate: Date;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  status: 'disponible' | 'epuise';
  vendeurId: string;
  vendeurName: string;
  vendeurPhone: string;
  vendeurPavilion: string;
  vendeurChambre: string;
  isVendeurVerified: boolean;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  vendeurId: string;
  products: CartItem[];
  message?: string;
  status: 'en_attente' | 'termine';
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
