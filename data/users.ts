export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  registeredAt: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  status: 'active' | 'inactive' | 'suspended';
}

// Datos mock de usuarios
export const users: User[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+1 (555) 123-4567',
    address: 'Calle Principal 123',
    city: 'Madrid',
    zipCode: '28001',
    registeredAt: '2024-01-15T10:30:00Z',
    totalOrders: 5,
    totalSpent: 450.75,
    lastOrderDate: '2024-11-01T14:20:00Z',
    status: 'active',
  },
  {
    id: '2',
    name: 'María González',
    email: 'maria.gonzalez@example.com',
    phone: '+1 (555) 234-5678',
    address: 'Avenida Libertad 456',
    city: 'Barcelona',
    zipCode: '08001',
    registeredAt: '2024-02-20T09:15:00Z',
    totalOrders: 12,
    totalSpent: 1280.50,
    lastOrderDate: '2024-10-28T16:45:00Z',
    status: 'active',
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@example.com',
    phone: '+1 (555) 345-6789',
    address: 'Plaza Mayor 789',
    city: 'Valencia',
    zipCode: '46001',
    registeredAt: '2024-03-10T11:00:00Z',
    totalOrders: 3,
    totalSpent: 320.00,
    lastOrderDate: '2024-09-15T10:30:00Z',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Ana Martínez',
    email: 'ana.martinez@example.com',
    phone: '+1 (555) 456-7890',
    address: 'Calle Sol 321',
    city: 'Sevilla',
    zipCode: '41001',
    registeredAt: '2024-04-05T14:45:00Z',
    totalOrders: 8,
    totalSpent: 890.25,
    lastOrderDate: '2024-11-01T12:00:00Z',
    status: 'active',
  },
  {
    id: '5',
    name: 'Luis Fernández',
    email: 'luis.fernandez@example.com',
    phone: '+1 (555) 567-8901',
    address: 'Avenida Europa 654',
    city: 'Bilbao',
    zipCode: '48001',
    registeredAt: '2024-05-12T08:20:00Z',
    totalOrders: 1,
    totalSpent: 95.50,
    lastOrderDate: '2024-08-20T15:30:00Z',
    status: 'inactive',
  },
  {
    id: '6',
    name: 'Laura Sánchez',
    email: 'laura.sanchez@example.com',
    phone: '+1 (555) 678-9012',
    address: 'Calle Luna 987',
    city: 'Málaga',
    zipCode: '29001',
    registeredAt: '2024-06-18T13:10:00Z',
    totalOrders: 15,
    totalSpent: 1850.00,
    lastOrderDate: '2024-11-01T18:00:00Z',
    status: 'active',
  },
  {
    id: '7',
    name: 'Pedro López',
    email: 'pedro.lopez@example.com',
    phone: '+1 (555) 789-0123',
    address: 'Plaza Central 147',
    city: 'Zaragoza',
    zipCode: '50001',
    registeredAt: '2024-07-22T10:00:00Z',
    totalOrders: 0,
    totalSpent: 0,
    status: 'inactive',
  },
  {
    id: '8',
    name: 'Carmen Ruiz',
    email: 'carmen.ruiz@example.com',
    phone: '+1 (555) 890-1234',
    address: 'Avenida Norte 258',
    city: 'Murcia',
    zipCode: '30001',
    registeredAt: '2024-08-30T16:30:00Z',
    totalOrders: 7,
    totalSpent: 675.80,
    lastOrderDate: '2024-10-25T11:15:00Z',
    status: 'active',
  },
  {
    id: '9',
    name: 'Diego Torres',
    email: 'diego.torres@example.com',
    phone: '+1 (555) 901-2345',
    address: 'Calle Sur 369',
    city: 'Palma',
    zipCode: '07001',
    registeredAt: '2024-09-05T09:45:00Z',
    totalOrders: 4,
    totalSpent: 420.30,
    lastOrderDate: '2024-10-20T14:00:00Z',
    status: 'active',
  },
  {
    id: '10',
    name: 'Sofía Morales',
    email: 'sofia.morales@example.com',
    phone: '+1 (555) 012-3456',
    address: 'Plaza Oeste 741',
    city: 'Granada',
    zipCode: '18001',
    registeredAt: '2024-10-10T12:20:00Z',
    totalOrders: 2,
    totalSpent: 180.60,
    lastOrderDate: '2024-10-18T10:45:00Z',
    status: 'suspended',
  },
];

export function getUsers(): User[] {
  return users;
}

export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

export function getUsersByStatus(status: User['status']): User[] {
  return users.filter(user => user.status === status);
}


