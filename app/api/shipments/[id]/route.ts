import { NextRequest, NextResponse } from 'next/server';
import type { Shipment } from '@/types/shipment';
import {
  getShipmentById,
  updateShipmentStatus,
} from '@/lib/firestore';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const shipment = await getShipmentById(id);

    if (!shipment) {
      return NextResponse.json(
        { error: 'Envío no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(shipment, { status: 200 });
  } catch (error: any) {
    console.error('Error en GET /api/shipments/[id]:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener el envío' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'El campo status es requerido' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'in_transit', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Status inválido. Debe ser uno de: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const updatedShipment = await updateShipmentStatus(id, status);

    return NextResponse.json(updatedShipment, { status: 200 });
  } catch (error: any) {
    console.error('Error en PATCH /api/shipments/[id]:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar el envío' },
      { status: 500 }
    );
  }
}
