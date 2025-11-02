export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating?: number;
  reviews?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}


