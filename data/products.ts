import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro 15"',
    description: 'Laptop de alto rendimiento con procesador Intel i7, 16GB RAM y 512GB SSD',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
    category: 'Electronics',
    stock: 15,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: '2',
    name: 'Smartphone Ultra',
    description: 'Teléfono inteligente con pantalla AMOLED 6.7", cámara de 108MP y batería de 5000mAh',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    category: 'Electronics',
    stock: 8,
    rating: 4.8,
    reviews: 256,
  },
  {
    id: '3',
    name: 'Auriculares Bluetooth Premium',
    description: 'Auriculares inalámbricos con cancelación de ruido activa y 30 horas de batería',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    category: 'Electronics',
    stock: 25,
    rating: 4.7,
    reviews: 189,
  },
  {
    id: '4',
    name: 'Smartwatch Fitness Pro',
    description: 'Reloj inteligente con monitor de frecuencia cardiaca, GPS y resistencia al agua',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    category: 'Electronics',
    stock: 12,
    rating: 4.6,
    reviews: 95,
  },
  {
    id: '5',
    name: 'Tablet 10"',
    description: 'Tablet con pantalla Full HD, 8GB RAM y 128GB de almacenamiento',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
    category: 'Electronics',
    stock: 20,
    rating: 4.4,
    reviews: 67,
  },
  {
    id: '6',
    name: 'Teclado Mecánico RGB',
    description: 'Teclado gaming con switches mecánicos, retroiluminación RGB y diseño ergonómico',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800',
    category: 'Electronics',
    stock: 30,
    rating: 4.9,
    reviews: 203,
  },
  {
    id: '7',
    name: 'Mouse Inalámbrico Pro',
    description: 'Mouse ergonómico con sensor de alta precisión y batería recargable',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800',
    category: 'Electronics',
    stock: 18,
    rating: 4.5,
    reviews: 142,
  },
  {
    id: '8',
    name: 'Monitor 27" 4K',
    description: 'Monitor profesional con resolución 4K, panel IPS y HDR10',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800',
    category: 'Electronics',
    stock: 10,
    rating: 4.7,
    reviews: 88,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

export function getCategories(): string[] {
  return Array.from(new Set(products.map(product => product.category)));
}


