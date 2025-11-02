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
import type { Product } from '@/types/product';

const PRODUCTS_COLLECTION = 'products';

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

// Convertir documento de Firestore a Product
const docToProduct = (docData: any, id: string): Product => {
  return {
    id,
    name: docData.name || '',
    description: docData.description || '',
    price: docData.price || 0,
    image: docData.image || '',
    category: docData.category || '',
    stock: docData.stock || 0,
    rating: docData.rating || undefined,
    reviews: docData.reviews || undefined,
  };
};

// Obtener todos los productos
export async function getProducts(): Promise<Product[]> {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(productsRef, orderBy('name', 'asc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => docToProduct(doc.data(), doc.id));
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    throw error;
  }
}

// Obtener un producto por ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(productRef);

    if (docSnap.exists()) {
      return docToProduct(docSnap.data(), docSnap.id);
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo producto:', error);
    throw error;
  }
}

// Crear un nuevo producto
export async function createProduct(data: Omit<Product, 'id'>): Promise<Product> {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    
    const newProduct = {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      category: data.category,
      stock: data.stock,
      rating: data.rating || null,
      reviews: data.reviews || null,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    
    const docRef = await addDoc(productsRef, newProduct);
    
    return {
      id: docRef.id,
      ...data,
    };
  } catch (error) {
    console.error('Error creando producto:', error);
    throw error;
  }
}

// Actualizar un producto
export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, 'id'>>
): Promise<Product> {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    
    const updateData: any = {
      ...data,
      updatedAt: Timestamp.now(),
    };
    
    await updateDoc(productRef, updateData);
    
    const updatedProduct = await getProductById(id);
    if (!updatedProduct) {
      throw new Error('Producto no encontrado después de actualizar');
    }
    
    return updatedProduct;
  } catch (error) {
    console.error('Error actualizando producto:', error);
    throw error;
  }
}

// Eliminar un producto
export async function deleteProduct(id: string): Promise<void> {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(productRef);
  } catch (error) {
    console.error('Error eliminando producto:', error);
    throw error;
  }
}

// Suscribirse a cambios en productos
export function subscribeToProducts(
  callback: (products: Product[]) => void
): Unsubscribe {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const q = query(productsRef, orderBy('name', 'asc'));

  return onSnapshot(q, (querySnapshot) => {
    const products = querySnapshot.docs.map((doc) =>
      docToProduct(doc.data(), doc.id)
    );
    callback(products);
  });
}


