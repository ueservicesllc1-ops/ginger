import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import type { Product } from '@/types/product';

const PRODUCTS_COLLECTION = 'products';

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

// GET - Obtener todos los productos
export async function GET() {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(productsRef, orderBy('name', 'asc'));
    const querySnapshot = await getDocs(q);

    const products = querySnapshot.docs.map((doc) =>
      docToProduct(doc.data(), doc.id)
    );

    return NextResponse.json({ products });
  } catch (error: any) {
    console.error('Error obteniendo productos:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo producto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, image, category, stock, rating, reviews } = body;

    // Validaciones
    if (!name || !description || price === undefined || !image || !category || stock === undefined) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    const productsRef = collection(db, PRODUCTS_COLLECTION);

    const newProduct = {
      name,
      description,
      price: Number(price),
      image,
      category,
      stock: Number(stock),
      rating: rating ? Number(rating) : null,
      reviews: reviews ? Number(reviews) : null,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(productsRef, newProduct);

    const product: Product = {
      id: docRef.id,
      name,
      description,
      price: Number(price),
      image,
      category,
      stock: Number(stock),
      rating: rating ? Number(rating) : undefined,
      reviews: reviews ? Number(reviews) : undefined,
    };

    return NextResponse.json({ product }, { status: 201 });
  } catch (error: any) {
    console.error('Error creando producto:', error);
    return NextResponse.json(
      { error: 'Error al crear producto', details: error.message },
      { status: 500 }
    );
  }
}


