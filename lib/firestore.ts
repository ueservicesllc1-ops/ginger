import { db } from './firebase';
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
import type { Shipment, CreateShipmentRequest } from '@/types/shipment';

const SHIPMENTS_COLLECTION = 'shipments';

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

// Convertir documento de Firestore a Shipment (sin id, se agrega después)
const docToShipment = (docData: any): Omit<Shipment, 'id'> => {
  return {
    fromAddress: docData.fromAddress || '',
    toAddress: docData.toAddress || '',
    status: docData.status || 'pending',
    createdAt: convertTimestamp(docData.createdAt),
    updatedAt: convertTimestamp(docData.updatedAt),
  };
};

// Obtener todos los envíos
export async function getShipments(): Promise<Shipment[]> {
  try {
    const shipmentsRef = collection(db, SHIPMENTS_COLLECTION);
    const q = query(shipmentsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...docToShipment(doc.data()),
    }));
  } catch (error) {
    console.error('Error obteniendo envíos:', error);
    throw error;
  }
}

// Obtener un envío por ID
export async function getShipmentById(id: string): Promise<Shipment | null> {
  try {
    const shipmentRef = doc(db, SHIPMENTS_COLLECTION, id);
    const shipmentSnap = await getDoc(shipmentRef);
    
    if (!shipmentSnap.exists()) {
      return null;
    }
    
    return {
      id: shipmentSnap.id,
      ...docToShipment(shipmentSnap.data()),
    };
  } catch (error) {
    console.error('Error obteniendo envío:', error);
    throw error;
  }
}

// Crear un nuevo envío
export async function createShipment(
  data: CreateShipmentRequest
): Promise<Shipment> {
  try {
    const shipmentsRef = collection(db, SHIPMENTS_COLLECTION);
    const now = Timestamp.now();
    
    const newShipment = {
      fromAddress: data.fromAddress,
      toAddress: data.toAddress,
      status: 'pending' as const,
      createdAt: now,
      updatedAt: now,
    };
    
    const docRef = await addDoc(shipmentsRef, newShipment);
    
    return {
      id: docRef.id,
      fromAddress: data.fromAddress,
      toAddress: data.toAddress,
      status: 'pending',
      createdAt: convertTimestamp(now),
      updatedAt: convertTimestamp(now),
    };
  } catch (error) {
    console.error('Error creando envío:', error);
    throw error;
  }
}

// Actualizar el estado de un envío
export async function updateShipmentStatus(
  id: string,
  status: Shipment['status']
): Promise<Shipment> {
  try {
    const shipmentRef = doc(db, SHIPMENTS_COLLECTION, id);
    await updateDoc(shipmentRef, {
      status,
      updatedAt: Timestamp.now(),
    });
    
    const updatedShipment = await getShipmentById(id);
    if (!updatedShipment) {
      throw new Error('Envío no encontrado después de actualizar');
    }
    
    return updatedShipment;
  } catch (error) {
    console.error('Error actualizando envío:', error);
    throw error;
  }
}

// Actualizar un envío completo
export async function updateShipment(
  id: string,
  data: Partial<CreateShipmentRequest>
): Promise<Shipment> {
  try {
    const shipmentRef = doc(db, SHIPMENTS_COLLECTION, id);
    const updateData: any = {
      updatedAt: Timestamp.now(),
    };
    
    if (data.fromAddress) updateData.fromAddress = data.fromAddress;
    if (data.toAddress) updateData.toAddress = data.toAddress;
    
    await updateDoc(shipmentRef, updateData);
    
    const updatedShipment = await getShipmentById(id);
    if (!updatedShipment) {
      throw new Error('Envío no encontrado después de actualizar');
    }
    
    return updatedShipment;
  } catch (error) {
    console.error('Error actualizando envío:', error);
    throw error;
  }
}

// Eliminar un envío
export async function deleteShipment(id: string): Promise<void> {
  try {
    const shipmentRef = doc(db, SHIPMENTS_COLLECTION, id);
    await deleteDoc(shipmentRef);
  } catch (error) {
    console.error('Error eliminando envío:', error);
    throw error;
  }
}

// Obtener envíos por estado
export async function getShipmentsByStatus(
  status: Shipment['status']
): Promise<Shipment[]> {
  try {
    const shipmentsRef = collection(db, SHIPMENTS_COLLECTION);
    const q = query(
      shipmentsRef,
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...docToShipment(doc.data()),
    }));
  } catch (error) {
    console.error('Error obteniendo envíos por estado:', error);
    throw error;
  }
}


