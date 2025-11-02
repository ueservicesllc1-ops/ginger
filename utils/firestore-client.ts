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

// Convertir documento de Firestore a Shipment
const docToShipment = (docData: any, id: string): Shipment => {
  return {
    id,
    fromAddress: docData.fromAddress || '',
    toAddress: docData.toAddress || '',
    status: docData.status || 'pending',
    createdAt: convertTimestamp(docData.createdAt),
    updatedAt: convertTimestamp(docData.updatedAt),
  };
};

// Obtener todos los envíos (cliente)
export async function getShipmentsClient(): Promise<Shipment[]> {
  try {
    const shipmentsRef = collection(db, SHIPMENTS_COLLECTION);
    const q = query(shipmentsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) =>
      docToShipment(doc.data(), doc.id)
    );
  } catch (error) {
    console.error('Error obteniendo envíos:', error);
    throw error;
  }
}

// Escuchar cambios en tiempo real (cliente)
export function subscribeToShipments(
  callback: (shipments: Shipment[]) => void
): Unsubscribe {
  const shipmentsRef = collection(db, SHIPMENTS_COLLECTION);
  const q = query(shipmentsRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    const shipments = querySnapshot.docs.map((doc) =>
      docToShipment(doc.data(), doc.id)
    );
    callback(shipments);
  });
}

// Escuchar un envío específico en tiempo real (cliente)
export function subscribeToShipment(
  id: string,
  callback: (shipment: Shipment | null) => void
): Unsubscribe {
  const shipmentRef = doc(db, SHIPMENTS_COLLECTION, id);
  
  return onSnapshot(shipmentRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docToShipment(docSnap.data(), docSnap.id));
    } else {
      callback(null);
    }
  });
}

// Crear envío (cliente)
export async function createShipmentClient(
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


