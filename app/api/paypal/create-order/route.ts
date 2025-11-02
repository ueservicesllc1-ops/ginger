import { NextRequest, NextResponse } from 'next/server';
import { createPayPalOrder } from '@/lib/paypal';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'USD', description } = body;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Amount is required and must be a positive number' },
        { status: 400 }
      );
    }

    const order = await createPayPalOrder(amount, currency, description);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      order: order,
    });
  } catch (error: any) {
    console.error('Error creating PayPal order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
}

