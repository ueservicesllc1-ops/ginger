/**
 * PayPal API Helper
 * Based on PayPal REST API documentation: https://developer.paypal.com/api/rest/
 */

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || '';
const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox';

const BASE_URL = PAYPAL_MODE === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

/**
 * Get PayPal Access Token
 * Exchange client ID and secret for access token
 */
export async function getPayPalAccessToken(): Promise<string> {
  try {
    // Verificar que las credenciales estén configuradas
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error('PayPal credentials not configured. Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in .env.local');
    }

    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
    
    const response = await fetch(`${BASE_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${auth}`,
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'PayPal auth failed';
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error_description || errorJson.error || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      
      console.error('PayPal authentication error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorMessage,
        clientIdLength: PAYPAL_CLIENT_ID.length,
        secretLength: PAYPAL_CLIENT_SECRET.length,
        mode: PAYPAL_MODE,
        baseUrl: BASE_URL
      });
      
      throw new Error(`PayPal auth failed: ${errorMessage}. Please verify your credentials in .env.local and restart the server.`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error: any) {
    console.error('Error obteniendo access token de PayPal:', error);
    throw new Error(`Failed to get PayPal access token: ${error.message}`);
  }
}

/**
 * Create PayPal Order
 * Creates an order in PayPal
 */
export async function createPayPalOrder(amount: number, currency: string = 'USD', description?: string) {
  try {
    const accessToken = await getPayPalAccessToken();
    
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          description: description || 'Personal Shopper Appointment',
        },
      ],
      application_context: {
        brand_name: 'Ginbri Store',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        locale: 'en-US',
        shipping_preference: 'NO_SHIPPING',
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/personal-shopper?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/personal-shopper?canceled=true`,
      },
    };

    const response = await fetch(`${BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`PayPal order creation failed: ${errorData}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error creando orden de PayPal:', error);
    throw new Error(`Failed to create PayPal order: ${error.message}`);
  }
}

/**
 * Capture PayPal Order
 * Captures payment for an approved order
 */
export async function capturePayPalOrder(orderId: string) {
  try {
    const accessToken = await getPayPalAccessToken();
    
    const response = await fetch(`${BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`PayPal capture failed: ${errorData}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error capturando orden de PayPal:', error);
    throw new Error(`Failed to capture PayPal order: ${error.message}`);
  }
}

