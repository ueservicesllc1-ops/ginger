import { NextRequest, NextResponse } from 'next/server';
import { capturePayPalOrder } from '@/lib/paypal';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId || typeof orderId !== 'string') {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const capture = await capturePayPalOrder(orderId);

    // Verificar si el pago fue exitoso
    if (capture.status === 'COMPLETED') {
      return NextResponse.json({
        success: true,
        status: capture.status,
        orderId: capture.id,
        payment: capture.purchase_units[0]?.payments?.captures?.[0],
      });
    } else {
      return NextResponse.json(
        { error: 'Payment was not completed', status: capture.status },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Error capturing PayPal order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to capture PayPal order' },
      { status: 500 }
    );
  }
}

