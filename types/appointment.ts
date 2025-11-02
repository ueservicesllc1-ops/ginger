export interface TimeSlot {
  id: string;
  time: string; // formato "HH:MM" (ej: "09:00", "14:30")
  available: boolean;
}

export interface DayAvailability {
  day: string; // "monday", "tuesday", etc. o fecha específica "2024-01-15"
  dayOfWeek?: number; // 0 = domingo, 1 = lunes, etc.
  available: boolean;
  timeSlots: TimeSlot[];
}

export interface Appointment {
  id: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string; // formato ISO date (ej: "2024-01-15")
  time: string | string[]; // formato "HH:MM" o array de horas ["09:00", "10:00"]
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  paymentMethod?: 'paypal' | 'transferencia' | 'zelle';
  totalPrice?: number; // Precio total calculado
  hoursCount?: number; // Número de horas seleccionadas
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilitySettings {
  id: string;
  pricePerHour: number; // Precio por hora en USD
  defaultAvailability: {
    [key: string]: { // dayOfWeek: 0-6
      available: boolean;
      timeSlots: string[]; // array de horas "HH:MM"
    };
  };
  specificDates: {
    [date: string]: { // fecha en formato "YYYY-MM-DD"
      available: boolean;
      timeSlots: string[];
    };
  };
  blockedDates: string[]; // array de fechas bloqueadas "YYYY-MM-DD"
  updatedAt: string;
}


