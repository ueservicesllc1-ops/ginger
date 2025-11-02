export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: string;
  code?: string;
  validUntil?: string;
}

export const promotions: Promotion[] = [
  {
    id: '1',
    title: 'Descuento del 30%',
    description: 'En todos los productos de electrónica',
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    code: 'ELEC30',
    validUntil: '2025-12-31',
  },
  {
    id: '2',
    title: 'Envío Gratis',
    description: 'En compras superiores a $50',
    discount: 'FREE SHIP',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800',
    code: 'FREE50',
    validUntil: '2025-12-31',
  },
  {
    id: '3',
    title: 'Nuevos Productos',
    description: 'Descubre nuestra última colección',
    discount: 'NEW',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    validUntil: '2025-12-31',
  },
];


