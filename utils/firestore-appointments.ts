'use client';

import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import type { Appointment, AvailabilitySettings } from '@/types/appointment';

const APPOINTMENTS_COLLECTION = 'appointments';
const AVAILABILITY_COLLECTION = 'availability';

const convertTimestamp = (timestamp: any): string => {
  if (timestamp?.toDate) {
    return timestamp.toDate().toISOString();
  }
  if (timestamp instanceof Date) {
    return timestamp.toISOString();
  }
  if (typeof timestamp === 'string') {
    return timestamp;
  }
  return new Date().toISOString();
};

const docToAppointment = (docData: any, id: string): Appointment => {
  return {
    id,
    userId: docData.userId || undefined,
    customerName: docData.customerName || '',
    customerEmail: docData.customerEmail || '',
    customerPhone: docData.customerPhone || '',
    date: docData.date || '',
    time: docData.time || '',
    status: docData.status || 'pending',
    notes: docData.notes || undefined,
    paymentMethod: docData.paymentMethod || undefined,
    createdAt: convertTimestamp(docData.createdAt),
    updatedAt: convertTimestamp(docData.updatedAt),
  };
};

// ============ APPOINTMENTS ============

export async function createAppointment(data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> {
  try {
    const appointmentsRef = collection(db, APPOINTMENTS_COLLECTION);
    const now = Timestamp.now();
    
    const newAppointment = {
      userId: data.userId || null,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      date: data.date,
      time: data.time,
      status: data.status || 'pending',
      notes: data.notes || null,
      paymentMethod: data.paymentMethod || null,
      totalPrice: data.totalPrice || null,
      hoursCount: data.hoursCount || null,
      createdAt: now,
      updatedAt: now,
    };
    
    const docRef = await addDoc(appointmentsRef, newAppointment);
    
    return {
      id: docRef.id,
      ...data,
      createdAt: convertTimestamp(now),
      updatedAt: convertTimestamp(now),
    };
  } catch (error) {
    console.error('Error creando cita:', error);
    throw error;
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  try {
    const appointmentsRef = collection(db, APPOINTMENTS_COLLECTION);
    // Ordenar por fecha y hora usando índice compuesto
    const q = query(appointmentsRef, orderBy('date', 'asc'), orderBy('time', 'asc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => docToAppointment(doc.data(), doc.id));
  } catch (error) {
    console.error('Error obteniendo citas:', error);
    throw error;
  }
}

export async function getAppointmentsByDate(date: string): Promise<Appointment[]> {
  try {
    const appointmentsRef = collection(db, APPOINTMENTS_COLLECTION);
    const q = query(appointmentsRef, where('date', '==', date), orderBy('time', 'asc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => docToAppointment(doc.data(), doc.id));
  } catch (error) {
    console.error('Error obteniendo citas por fecha:', error);
    throw error;
  }
}

export async function getAppointmentById(id: string): Promise<Appointment | null> {
  try {
    const appointmentRef = doc(db, APPOINTMENTS_COLLECTION, id);
    const docSnap = await getDoc(appointmentRef);

    if (docSnap.exists()) {
      return docToAppointment(docSnap.data(), docSnap.id);
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo cita:', error);
    throw error;
  }
}

export async function updateAppointment(
  id: string,
  data: Partial<Omit<Appointment, 'id' | 'createdAt'>>
): Promise<Appointment> {
  try {
    const appointmentRef = doc(db, APPOINTMENTS_COLLECTION, id);
    
    await updateDoc(appointmentRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
    
    const updated = await getAppointmentById(id);
    if (!updated) {
      throw new Error('Cita no encontrada después de actualizar');
    }
    
    return updated;
  } catch (error) {
    console.error('Error actualizando cita:', error);
    throw error;
  }
}

export async function deleteAppointment(id: string): Promise<void> {
  try {
    const appointmentRef = doc(db, APPOINTMENTS_COLLECTION, id);
    await deleteDoc(appointmentRef);
  } catch (error) {
    console.error('Error eliminando cita:', error);
    throw error;
  }
}

// ============ AVAILABILITY ============

export async function getAvailabilitySettings(): Promise<AvailabilitySettings | null> {
  try {
    const availabilityRef = collection(db, AVAILABILITY_COLLECTION);
    const q = query(availabilityRef, orderBy('updatedAt', 'desc'));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        pricePerHour: data.pricePerHour || 25.00,
        defaultAvailability: data.defaultAvailability || {},
        specificDates: data.specificDates || {},
        blockedDates: data.blockedDates || [],
        updatedAt: convertTimestamp(data.updatedAt),
      };
    }
    
    // Si no existe, crear configuración por defecto
    return null;
  } catch (error) {
    console.error('Error obteniendo disponibilidad:', error);
    throw error;
  }
}

export async function saveAvailabilitySettings(
  settings: Omit<AvailabilitySettings, 'id' | 'updatedAt'>
): Promise<AvailabilitySettings> {
  try {
    const availabilityRef = collection(db, AVAILABILITY_COLLECTION);
    
    // Eliminar configuraciones anteriores (solo mantener la más reciente)
    const existing = await getAvailabilitySettings();
    if (existing) {
      const oldDocRef = doc(db, AVAILABILITY_COLLECTION, existing.id);
      await deleteDoc(oldDocRef);
    }
    
    const newSettings = {
      pricePerHour: settings.pricePerHour || 25.00,
      defaultAvailability: settings.defaultAvailability,
      specificDates: settings.specificDates,
      blockedDates: settings.blockedDates,
      updatedAt: Timestamp.now(),
    };
    
    const docRef = await addDoc(availabilityRef, newSettings);
    
    return {
      id: docRef.id,
      ...settings,
      updatedAt: convertTimestamp(newSettings.updatedAt),
    };
  } catch (error) {
    console.error('Error guardando disponibilidad:', error);
    throw error;
  }
}

export async function isTimeSlotAvailable(date: string, time: string): Promise<boolean> {
  try {
    // Verificar si hay una cita en esa fecha y hora
    const appointments = await getAppointmentsByDate(date);
    const hasAppointment = appointments.some(
      (apt) => apt.time === time && apt.status !== 'cancelled'
    );
    
    if (hasAppointment) {
      return false;
    }
    
    // Verificar disponibilidad en configuración
    const settings = await getAvailabilitySettings();
    if (!settings) {
      return false; // Sin configuración = no disponible
    }
    
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay().toString();
    
    // Verificar si la fecha está bloqueada
    if (settings.blockedDates.includes(date)) {
      return false;
    }
    
    // Verificar disponibilidad específica de la fecha
    if (settings.specificDates[date]) {
      const dateAvailability = settings.specificDates[date];
      if (!dateAvailability.available) {
        return false;
      }
      return dateAvailability.timeSlots.includes(time);
    }
    
    // Verificar disponibilidad por día de la semana
    const dayAvailability = settings.defaultAvailability[dayOfWeek];
    if (!dayAvailability || !dayAvailability.available) {
      return false;
    }
    
    return dayAvailability.timeSlots.includes(time);
  } catch (error) {
    console.error('Error verificando disponibilidad:', error);
    return false;
  }
}

export async function getAvailableTimeSlots(date: string): Promise<string[]> {
  try {
    const settings = await getAvailabilitySettings();
    if (!settings) {
      return [];
    }
    
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay().toString();
    
    // Verificar si la fecha está bloqueada
    if (settings.blockedDates.includes(date)) {
      return [];
    }
    
    // Obtener citas existentes para esa fecha
    const appointments = await getAppointmentsByDate(date);
    const bookedTimes = appointments
      .filter((apt) => apt.status !== 'cancelled')
      .map((apt) => apt.time);
    
    let availableSlots: string[] = [];
    
    // Verificar disponibilidad específica de la fecha
    if (settings.specificDates[date]) {
      const dateAvailability = settings.specificDates[date];
      if (dateAvailability.available) {
        availableSlots = dateAvailability.timeSlots.filter(
          (slot) => !bookedTimes.includes(slot)
        );
      }
    } else {
      // Verificar disponibilidad por día de la semana
      const dayAvailability = settings.defaultAvailability[dayOfWeek];
      if (dayAvailability && dayAvailability.available) {
        availableSlots = dayAvailability.timeSlots.filter(
          (slot) => !bookedTimes.includes(slot)
        );
      }
    }
    
    return availableSlots.sort();
  } catch (error) {
    console.error('Error obteniendo horarios disponibles:', error);
    return [];
  }
}

