export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María González',
    rating: 5,
    comment: 'Excelente servicio y productos de calidad. La entrega fue muy rápida y el producto superó mis expectativas.',
    date: '2025-01-15',
  },
  {
    id: '2',
    name: 'Carlos Martínez',
    rating: 5,
    comment: 'Muy satisfecho con mi compra. El proceso fue sencillo y el producto llegó en perfecto estado.',
    date: '2025-01-10',
  },
  {
    id: '3',
    name: 'Ana Rodríguez',
    rating: 4,
    comment: 'Buen precio y calidad. La atención al cliente es excelente. Recomendado totalmente.',
    date: '2025-01-08',
  },
  {
    id: '4',
    name: 'Luis Fernández',
    rating: 5,
    comment: 'Compra rápida y fácil. El producto es exactamente lo que esperaba. Definitivamente compraré de nuevo.',
    date: '2025-01-05',
  },
  {
    id: '5',
    name: 'Sofía López',
    rating: 5,
    comment: 'Increíble experiencia de compra. Productos de alta calidad y envío super rápido. ¡Excelente!',
    date: '2025-01-03',
  },
  {
    id: '6',
    name: 'David Torres',
    rating: 4,
    comment: 'Muy buena tienda online. Los precios son competitivos y el servicio de atención es excelente.',
    date: '2024-12-28',
  },
];


