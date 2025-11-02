/**
 * EmailJS utility for sending emails
 * Configure your EmailJS credentials in .env.local:
 * NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
 * NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
 * NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
 */

import emailjs from '@emailjs/browser';

// Leer variables directamente - Next.js las inyecta en tiempo de build para NEXT_PUBLIC_*
const getServiceId = () => process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const getTemplateId = () => process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const getPublicKey = () => process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

// Inicializar EmailJS cuando se necesite
let emailjsInitialized = false;
const initializeEmailJS = () => {
  if (emailjsInitialized) return;
  const publicKey = getPublicKey();
  if (publicKey) {
    emailjs.init(publicKey);
    emailjsInitialized = true;
  }
};

export interface AppointmentEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string | string[];
  totalPrice: number;
  hoursCount: number;
  paymentMethod: string;
  notes?: string;
}

/**
 * Send appointment confirmation email
 */
export async function sendAppointmentEmail(data: AppointmentEmailData): Promise<boolean> {
  try {
    // Leer variables dinámicamente
    const SERVICE_ID = getServiceId();
    const TEMPLATE_ID = getTemplateId();
    const PUBLIC_KEY = getPublicKey();
    
    // Inicializar EmailJS si no está inicializado
    initializeEmailJS();
    
    // Debug: Log los valores (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.log('[EmailJS Debug] Variables:', {
        SERVICE_ID: SERVICE_ID ? `${SERVICE_ID.substring(0, 10)}...` : 'VACÍO',
        TEMPLATE_ID: TEMPLATE_ID ? `${TEMPLATE_ID.substring(0, 10)}...` : 'VACÍO',
        PUBLIC_KEY: PUBLIC_KEY ? `${PUBLIC_KEY.substring(0, 10)}...` : 'VACÍO',
      });
    }
    
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      const missingVars = [];
      if (!SERVICE_ID) missingVars.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
      if (!TEMPLATE_ID) missingVars.push('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID');
      if (!PUBLIC_KEY) missingVars.push('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY');
      
      console.error(
        `❌ EmailJS no está configurado. Variables faltantes: ${missingVars.join(', ')}.\n` +
        `⚠️  IMPORTANTE: En Railway, asegúrate de:\n` +
        `   1. Agregar las variables en la sección "Variables" del proyecto\n` +
        `   2. REINICIAR el deployment después de agregar las variables\n` +
        `   3. Verificar que no hay espacios extra en los valores\n` +
        `   4. Las variables NEXT_PUBLIC_* deben estar disponibles en tiempo de BUILD\n\n` +
        `   Valores detectados:\n` +
        `   - SERVICE_ID: ${SERVICE_ID ? '✅ configurado' : '❌ faltante'}\n` +
        `   - TEMPLATE_ID: ${TEMPLATE_ID ? '✅ configurado' : '❌ faltante'}\n` +
        `   - PUBLIC_KEY: ${PUBLIC_KEY ? '✅ configurado' : '❌ faltante'}`
      );
      return false;
    }

    const timeDisplay = Array.isArray(data.time) 
      ? data.time.join(', ')
      : data.time;

    const templateParams = {
      to_name: data.customerName,
      to_email: data.customerEmail,
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      customer_phone: data.customerPhone,
      appointment_date: data.date,
      appointment_time: timeDisplay,
      appointment_hours: data.hoursCount.toString(),
      total_price: `$${data.totalPrice.toFixed(2)} USD`,
      payment_method: data.paymentMethod,
      notes: data.notes || 'N/A',
      reply_to: data.customerEmail,
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      console.log('Correo enviado exitosamente');
      return true;
    } else {
      console.error('Error enviando correo:', response);
      return false;
    }
  } catch (error) {
    console.error('Error enviando correo:', error);
    return false;
  }
}

