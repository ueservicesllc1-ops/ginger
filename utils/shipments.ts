import type { Shipment, CreateShipmentRequest } from '@/types/shipment';

const API_BASE_URL = '/api/shipments';

export async function createShipment(
  data: CreateShipmentRequest
): Promise<Shipment> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al crear el envío');
  }

  return response.json();
}

export async function getShipments(): Promise<Shipment[]> {
  const response = await fetch(API_BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al obtener los envíos');
  }

  return response.json();
}

export async function getShipmentById(id: string): Promise<Shipment> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al obtener el envío');
  }

  return response.json();
}

export async function updateShipmentStatus(
  id: string,
  status: Shipment['status']
): Promise<Shipment> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al actualizar el envío');
  }

  return response.json();
}


