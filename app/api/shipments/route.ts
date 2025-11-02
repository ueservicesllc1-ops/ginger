import { NextRequest, NextResponse } from 'next/server';
import type { Shipment, CreateShipmentRequest } from '@/types/shipment';
import {
  getShipments,
  createShipment,
} from '@/lib/firestore';

export async function GET() {
  try {
    const allShipments = await getShipments();
    return NextResponse.json(allShipments, { status: 200 });
  } catch (error: any) {
    console.error('Error en GET /api/shipments:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener envíos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateShipmentRequest = await request.json();
    const { fromAddress, toAddress } = body;

    if (!fromAddress || !toAddress) {
      return NextResponse.json(
        { error: 'fromAddress y toAddress son requeridos' },
        { status: 400 }
      );
    }

    const newShipment = await createShipment({ fromAddress, toAddress });

    return NextResponse.json(newShipment, { status: 201 });
  } catch (error: any) {
    console.error('Error en POST /api/shipments:', error);
    return NextResponse.json(
      { error: error.message || 'Error al crear el envío' },
      { status: 500 }
    );
  }
}
