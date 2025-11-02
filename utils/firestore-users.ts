'use client';

// Funciones del cliente para usar Firestore directamente en componentes del cliente
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
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import type { User } from '@/data/users';

const USERS_COLLECTION = 'users';

// Convertir Firestore Timestamp a ISO string
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

// Convertir documento de Firestore a User
const docToUser = (docData: any, id: string): User => {
  return {
    id,
    name: docData.name || '',
    email: docData.email || '',
    phone: docData.phone || undefined,
    address: docData.address || undefined,
    city: docData.city || undefined,
    zipCode: docData.zipCode || undefined,
    registeredAt: convertTimestamp(docData.registeredAt),
    totalOrders: docData.totalOrders || 0,
    totalSpent: docData.totalSpent || 0,
    lastOrderDate: docData.lastOrderDate ? convertTimestamp(docData.lastOrderDate) : undefined,
    status: docData.status || 'active',
  };
};

// Obtener todos los usuarios
export async function getUsers(): Promise<User[]> {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, orderBy('registeredAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => docToUser(doc.data(), doc.id));
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    throw error;
  }
}

// Obtener un usuario por ID
export async function getUserById(id: string): Promise<User | null> {
  try {
    const userRef = doc(db, USERS_COLLECTION, id);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docToUser(docSnap.data(), docSnap.id);
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    throw error;
  }
}

// Obtener un usuario por email
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return docToUser(doc.data(), doc.id);
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo usuario por email:', error);
    throw error;
  }
}

// Crear o actualizar usuario (si existe por email, actualiza; si no, crea)
export async function createOrUpdateUser(data: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  orderTotal?: number; // Total del pedido actual
}): Promise<User> {
  try {
    // Buscar usuario existente por email
    const existingUser = await getUserByEmail(data.email);

    if (existingUser) {
      // Actualizar usuario existente
      const userRef = doc(db, USERS_COLLECTION, existingUser.id);
      
      const updateData: any = {
        name: data.name,
        email: data.email,
        updatedAt: Timestamp.now(),
      };

      // Actualizar campos opcionales si se proporcionan
      if (data.phone !== undefined) updateData.phone = data.phone;
      if (data.address !== undefined) updateData.address = data.address;
      if (data.city !== undefined) updateData.city = data.city;
      if (data.zipCode !== undefined) updateData.zipCode = data.zipCode;

      // Actualizar estadísticas de pedidos
      updateData.totalOrders = (existingUser.totalOrders || 0) + 1;
      updateData.totalSpent = (existingUser.totalSpent || 0) + (data.orderTotal || 0);
      updateData.lastOrderDate = Timestamp.now();
      updateData.status = 'active'; // Marcar como activo cuando hace un pedido

      await updateDoc(userRef, updateData);

      return {
        ...existingUser,
        ...updateData,
        totalOrders: updateData.totalOrders,
        totalSpent: updateData.totalSpent,
        lastOrderDate: convertTimestamp(updateData.lastOrderDate),
        registeredAt: existingUser.registeredAt, // Mantener fecha original de registro
      };
    } else {
      // Crear nuevo usuario
      const usersRef = collection(db, USERS_COLLECTION);
      const now = Timestamp.now();
      
      const newUser = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        address: data.address || null,
        city: data.city || null,
        zipCode: data.zipCode || null,
        registeredAt: now,
        totalOrders: 1,
        totalSpent: data.orderTotal || 0,
        lastOrderDate: now,
        status: 'active',
        createdAt: now,
        updatedAt: now,
      };
      
      const docRef = await addDoc(usersRef, newUser);
      
      return {
        id: docRef.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        zipCode: data.zipCode,
        registeredAt: convertTimestamp(now),
        totalOrders: 1,
        totalSpent: data.orderTotal || 0,
        lastOrderDate: convertTimestamp(now),
        status: 'active',
      };
    }
  } catch (error) {
    console.error('Error creando/actualizando usuario:', error);
    throw error;
  }
}

// Actualizar un usuario
export async function updateUser(
  id: string,
  data: Partial<Omit<User, 'id' | 'registeredAt'>>
): Promise<User> {
  try {
    const userRef = doc(db, USERS_COLLECTION, id);
    
    const updateData: any = {
      ...data,
      updatedAt: Timestamp.now(),
    };
    
    // Convertir strings de fecha a Timestamps si existen
    if (data.lastOrderDate) {
      updateData.lastOrderDate = Timestamp.fromDate(new Date(data.lastOrderDate));
    }
    
    await updateDoc(userRef, updateData);
    
    const updatedUser = await getUserById(id);
    if (!updatedUser) {
      throw new Error('Usuario no encontrado después de actualizar');
    }
    
    return updatedUser;
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    throw error;
  }
}

// Eliminar un usuario
export async function deleteUser(id: string): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, id);
    await deleteDoc(userRef);
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    throw error;
  }
}

// Suscribirse a cambios en usuarios
export function subscribeToUsers(
  callback: (users: User[]) => void
): Unsubscribe {
  const usersRef = collection(db, USERS_COLLECTION);
  const q = query(usersRef, orderBy('registeredAt', 'desc'));

  return onSnapshot(q, (querySnapshot) => {
    const users = querySnapshot.docs.map((doc) =>
      docToUser(doc.data(), doc.id)
    );
    callback(users);
  });
}


