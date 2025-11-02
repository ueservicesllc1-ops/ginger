/**
 * EmailJS utility for sending emails
 * Configure your EmailJS credentials in .env.local:
 * NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
 * NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
 * NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
 */

import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

// Initialize EmailJS
if (PUBLIC_KEY) {
  emailjs.init(PUBLIC_KEY);
}

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
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.warn('EmailJS no está configurado. Configura las variables de entorno necesarias.');
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

