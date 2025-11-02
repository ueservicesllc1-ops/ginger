'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Calendar from '@/components/Calendar';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, CheckCircle, AlertCircle, CreditCard, X } from 'lucide-react';
import { createAppointment, getAvailableTimeSlots, isTimeSlotAvailable, getAvailabilitySettings } from '@/utils/firestore-appointments';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { sendAppointmentEmail } from '@/utils/emailjs';

type PaymentMethod = 'paypal' | 'transferencia' | 'zelle' | null;

export default function PersonalShopperPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]); // Múltiples horas
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdAppointment, setCreatedAppointment] = useState<{date: string; times: string[]; totalPrice: number} | null>(null);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(null);
  const [pricePerHour, setPricePerHour] = useState<number>(25.00);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  useEffect(() => {
    loadBlockedDates();
    loadPricePerHour();
  }, []);

  const loadPricePerHour = async () => {
    try {
      const settings = await getAvailabilitySettings();
      if (settings) {
        setPricePerHour(settings.pricePerHour || 25.00);
      }
    } catch (error) {
      console.error('Error cargando precio por hora:', error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      loadAvailableTimeSlots();
    }
  }, [selectedDate]);

  const loadBlockedDates = async () => {
    try {
      const settings = await getAvailabilitySettings();
      if (settings) {
        setBlockedDates(settings.blockedDates || []);
      }
    } catch (error) {
      console.error('Error cargando fechas bloqueadas:', error);
    }
  };

  const loadAvailableTimeSlots = async () => {
    if (!selectedDate) return;
    
    setLoading(true);
    setError(null);
    try {
      const dateStr = formatDate(selectedDate);
      const slots = await getAvailableTimeSlots(dateStr);
      setAvailableTimeSlots(slots);
      
      // Resetear selección de tiempo si ya no están disponibles
      const validTimes = selectedTimes.filter(time => slots.includes(time));
      if (validTimes.length !== selectedTimes.length) {
        setSelectedTimes(validTimes);
      }
    } catch (err: any) {
      console.error('Error cargando horarios:', err);
      setError('Error al cargar horarios disponibles');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimes([]);
    setSuccess(false);
  };

  const handleTimeSelect = (time: string) => {
    if (selectedTimes.includes(time)) {
      // Deseleccionar
      setSelectedTimes(selectedTimes.filter(t => t !== time));
    } else {
      // Seleccionar (permitir múltiples)
      setSelectedTimes([...selectedTimes, time].sort());
    }
    setSuccess(false);
  };

  // Calcular precio total basado en horas seleccionadas
  const calculateTotalPrice = (): number => {
    return selectedTimes.length * pricePerHour;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || selectedTimes.length === 0) {
      setError('Por favor, selecciona una fecha y al menos una hora');
      return;
    }

    // Validar que el formulario esté completo
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Por favor, completa todos los campos obligatorios');
      return;
    }

    setError(null);
    // Mostrar opciones de pago en lugar de enviar directamente
    setShowPaymentOptions(true);
  };

  const handlePaymentSelection = (paymentMethod: PaymentMethod) => {
    if (!paymentMethod) return;
    
    // Para PayPal, solo seleccionamos el método (se mostrará el botón)
    // Para otros métodos, procesamos inmediatamente
    setSelectedPaymentMethod(paymentMethod);
    
    if (paymentMethod !== 'paypal') {
      // Para transferencia y zelle, procesar directamente
      processNonPayPalPayment(paymentMethod);
    }
  };

  const processNonPayPalPayment = async (paymentMethod: PaymentMethod) => {
    if (!paymentMethod || paymentMethod === 'paypal') return;

    setSubmitting(true);
    setError(null);

    try {
      // Verificar disponibilidad para todas las horas seleccionadas
      const dateStr = formatDate(selectedDate!);
      for (const time of selectedTimes) {
        const isAvailable = await isTimeSlotAvailable(dateStr, time);
        if (!isAvailable) {
          setError(`El horario ${time} ya no está disponible. Por favor, selecciona otros horarios.`);
          setShowPaymentOptions(false);
          await loadAvailableTimeSlots();
          setSubmitting(false);
          return;
        }
      }

      const totalPrice = calculateTotalPrice();

      const appointment = await createAppointment({
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        date: dateStr,
        time: selectedTimes,
        status: 'pending',
        notes: formData.notes || undefined,
        paymentMethod: paymentMethod,
        totalPrice: totalPrice,
        hoursCount: selectedTimes.length,
      });

      // Enviar correo de confirmación
      try {
        await sendAppointmentEmail({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          date: dateStr,
          time: selectedTimes,
          totalPrice: totalPrice,
          hoursCount: selectedTimes.length,
          paymentMethod: paymentMethod,
          notes: formData.notes,
        });
      } catch (emailError) {
        console.error('Error enviando correo (no crítico):', emailError);
        // No bloqueamos el flujo si falla el correo
      }

      // Guardar datos para el modal
      setCreatedAppointment({
        date: dateStr,
        times: selectedTimes,
        totalPrice: totalPrice,
      });

      setSuccess(true);
      setShowSuccessModal(true);
      setShowPaymentOptions(false);
    } catch (err: any) {
      console.error('Error agendando cita:', err);
      setError(err.message || 'Error al agendar la cita. Por favor, intenta de nuevo.');
      setShowPaymentOptions(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayPalApprove = async (data: any, actions: any) => {
    try {
      setSubmitting(true);
      setError(null);

      // Capturar el pago usando el orderId que viene de PayPal
      const orderId = data.orderID;

      // Primero, capturamos el pago en el servidor
      const captureResponse = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId,
        }),
      });

      const captureData = await captureResponse.json();

      if (!captureData.success) {
        throw new Error(captureData.error || 'Error al capturar pago');
      }

        // Verificar disponibilidad para todas las horas seleccionadas
        const dateStr = formatDate(selectedDate!);
        for (const time of selectedTimes) {
          const isAvailable = await isTimeSlotAvailable(dateStr, time);
          if (!isAvailable) {
            setError(`El horario ${time} ya no está disponible. Por favor, selecciona otros horarios.`);
            await loadAvailableTimeSlots();
            setSubmitting(false);
            return;
          }
        }

        const totalPrice = calculateTotalPrice();

        // Crear la cita después de pago exitoso
        const appointment = await createAppointment({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          date: dateStr,
          time: selectedTimes,
          status: 'confirmed', // PayPal pagos están confirmados
          notes: formData.notes || undefined,
          paymentMethod: 'paypal',
          totalPrice: totalPrice,
          hoursCount: selectedTimes.length,
        });

        // Enviar correo de confirmación
        try {
          await sendAppointmentEmail({
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            date: dateStr,
            time: selectedTimes,
            totalPrice: totalPrice,
            hoursCount: selectedTimes.length,
            paymentMethod: 'paypal',
            notes: formData.notes,
          });
        } catch (emailError) {
          console.error('Error enviando correo (no crítico):', emailError);
          // No bloqueamos el flujo si falla el correo
        }

        // Guardar datos para el modal
        setCreatedAppointment({
          date: dateStr,
          times: selectedTimes,
          totalPrice: totalPrice,
        });

      setSuccess(true);
      setShowSuccessModal(true);
      setShowPaymentOptions(false);
    } catch (error: any) {
      console.error('Error en proceso PayPal:', error);
      setError(error.message || 'Error al procesar el pago. Por favor, intenta de nuevo.');
      setShowPaymentOptions(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Obtener PayPal Client ID del entorno
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'AcSfnCDBnACHCS6xuGjLK0T8gBbUtagLWdDEv1MJ_xEF-yEgmifsj2PbsrUrIHmVxrKlOUqB-0cRx6U9';

  // Verificar si PayPal está configurado
  if (!paypalClientId) {
    console.warn('PayPal Client ID no configurado. Configura NEXT_PUBLIC_PAYPAL_CLIENT_ID en .env.local');
  }

  return (
    <PayPalScriptProvider 
      options={{ 
        clientId: paypalClientId, 
        currency: 'USD',
        intent: 'capture',
      }}
    >
      <div className="min-h-screen bg-white">
        <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Agenda tu Cita con Personal Shopper
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nuestro equipo de expertos te ayudará a encontrar los mejores productos según tus necesidades
          </p>
        </motion.div>


        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Error</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendario - Columna 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
                Seleccionar Fecha
              </h3>
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                unavailableDates={blockedDates}
              />
            </div>
          </motion.div>

          {/* Horarios Disponibles - Columna 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Horarios disponibles */}
            {selectedDate && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Horarios Disponibles
                </h3>
                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Cargando horarios...</p>
                  </div>
                ) : availableTimeSlots.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {availableTimeSlots.map((time) => (
                      <motion.button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-3 rounded-lg font-medium transition-all ${
                          selectedTimes.includes(time)
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No hay horarios disponibles para esta fecha</p>
                    <p className="text-sm text-gray-500 mt-2">Selecciona otra fecha</p>
                  </div>
                )}
              </div>
            )}

            {/* Instrucciones cuando no hay fecha */}
            {!selectedDate && (
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium mb-2">Selecciona una fecha</p>
                <p className="text-sm text-gray-500">
                  Elige una fecha en el calendario para ver los horarios disponibles
                </p>
              </div>
            )}
          </motion.div>

          {/* Resumen de Cita - Columna 3 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            {selectedDate && selectedTimes.length > 0 ? (
              <>
                {/* Resumen */}
                <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    Resumen de Cita
                  </h3>
                  
                  <div className="space-y-3">
                    {/* Fecha */}
                    <div className="pb-3 border-b border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Fecha</p>
                      <p className="font-semibold text-sm text-gray-900 capitalize">
                        {formatDisplayDate(selectedDate)}
                      </p>
                    </div>

                    {/* Horarios */}
                    <div className="pb-3 border-b border-gray-200">
                      <p className="text-xs text-gray-600 mb-2">Horarios seleccionados</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedTimes.map((time) => (
                          <span
                            key={time}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                          >
                            {time}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5">
                        {selectedTimes.length} hora{selectedTimes.length > 1 ? 's' : ''}
                      </p>
                    </div>

                    {/* Precio */}
                    <div className="pb-3 border-b border-gray-200">
                      <div className="flex justify-between items-center mb-1.5">
                        <p className="text-xs text-gray-600">Precio por hora</p>
                        <p className="font-medium text-sm text-gray-900">${pricePerHour.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-700">Total</p>
                        <p className="text-lg font-bold text-blue-600">
                          ${calculateTotalPrice().toFixed(2)} USD
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formulario de Contacto - Compacto */}
                <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    Información de Contacto
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none"
                        placeholder="Juan Pérez"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none"
                        placeholder="juan@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-xs font-medium text-gray-700 mb-1">
                        Notas (opcional)
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none resize-none"
                        placeholder="Preferencias especiales..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={submitting || showPaymentOptions}
                      whileHover={{ scale: submitting || showPaymentOptions ? 1 : 1.02 }}
                      whileTap={{ scale: submitting || showPaymentOptions ? 1 : 0.98 }}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-all text-sm"
                    >
                      Confirmar Cita
                    </motion.button>
                  </form>
                </div>
              </>
            ) : (
              <div className="bg-gray-50 rounded-xl p-6 text-center border-2 border-gray-200">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium mb-2">Resumen de cita</p>
                <p className="text-sm text-gray-500">
                  Selecciona una fecha y horarios para ver el resumen aquí
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Modal de Opciones de Pago */}
        {showPaymentOptions && !success && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  Selecciona Método de Pago
                </h3>
                <button
                  onClick={() => {
                    setShowPaymentOptions(false);
                    setSelectedPaymentMethod(null);
                  }}
                  disabled={submitting}
                  className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {/* Resumen rápido en el modal */}
                {selectedDate && selectedTimes.length > 0 && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600 mb-1">Resumen de tu cita</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDisplayDate(selectedDate)} - {selectedTimes.length} hora{selectedTimes.length > 1 ? 's' : ''}
                    </p>
                    <p className="text-sm font-bold text-blue-600 mt-1">
                      Total: ${calculateTotalPrice().toFixed(2)} USD
                    </p>
                  </div>
                )}
                
                <div className="space-y-3">
                  {selectedPaymentMethod !== 'paypal' && (
                    <motion.button
                      onClick={() => handlePaymentSelection('paypal')}
                      disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.02 }}
                      whileTap={{ scale: submitting ? 1 : 0.98 }}
                      className="w-full p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 bg-white transition-all text-left flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100">
                        <span className="text-xl font-bold text-gray-600">P</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">PayPal</p>
                        <p className="text-sm text-gray-600">Paga de forma segura con PayPal</p>
                      </div>
                    </motion.button>
                  )}

                  {selectedPaymentMethod === 'paypal' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg"
                      key={`paypal-${selectedTimes.length}-${calculateTotalPrice().toFixed(2)}`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                        <p className="font-semibold text-gray-900">PayPal seleccionado</p>
                        <button
                          onClick={() => setSelectedPaymentMethod(null)}
                          className="ml-auto text-sm text-gray-600 hover:text-gray-800"
                        >
                          Cambiar
                        </button>
                      </div>
                      <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-gray-700 mb-1">
                          {selectedTimes.length} hora{selectedTimes.length > 1 ? 's' : ''} × ${pricePerHour.toFixed(2)}/hora
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          Total: ${calculateTotalPrice().toFixed(2)} USD
                        </p>
                      </div>
                      <PayPalButtons
                        key={`paypal-buttons-${selectedTimes.length}-${calculateTotalPrice().toFixed(2)}`}
                        createOrder={async () => {
                          try {
                            const totalPrice = calculateTotalPrice();
                            const response = await fetch('/api/paypal/create-order', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                amount: totalPrice,
                                currency: 'USD',
                                description: `Cita Personal Shopper - ${selectedDate ? formatDisplayDate(selectedDate) : ''} (${selectedTimes.length} hora${selectedTimes.length > 1 ? 's' : ''}: ${selectedTimes.join(', ')})`,
                              }),
                            });

                            const orderData = await response.json();
                            
                            if (!orderData.success) {
                              throw new Error(orderData.error || 'Error al crear orden');
                            }

                            return orderData.orderId;
                          } catch (error: any) {
                            console.error('Error creando orden PayPal:', error);
                            setError('Error al inicializar el pago. Por favor, intenta de nuevo.');
                            throw error;
                          }
                        }}
                        onApprove={handlePayPalApprove}
                        onError={(err) => {
                          console.error('Error en PayPal:', err);
                          setError('Error al procesar el pago con PayPal. Por favor, intenta de nuevo.');
                          setSubmitting(false);
                        }}
                        onCancel={() => {
                          setError('Pago cancelado. Puedes seleccionar otro método de pago.');
                          setSelectedPaymentMethod(null);
                        }}
                        style={{
                          layout: 'vertical',
                          color: 'blue',
                          shape: 'rect',
                          label: 'paypal',
                        }}
                      />
                    </motion.div>
                  )}

                  <motion.button
                    onClick={() => handlePaymentSelection('transferencia')}
                    disabled={submitting}
                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-4 ${
                      selectedPaymentMethod === 'transferencia'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                    } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedPaymentMethod === 'transferencia' ? 'bg-blue-600' : 'bg-gray-100'
                    }`}>
                      <CreditCard className={`w-6 h-6 ${selectedPaymentMethod === 'transferencia' ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Transferencia Bancaria</p>
                      <p className="text-sm text-gray-600">Transfiere directamente a nuestra cuenta</p>
                    </div>
                    {selectedPaymentMethod === 'transferencia' && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </motion.button>

                  <motion.button
                    onClick={() => handlePaymentSelection('zelle')}
                    disabled={submitting}
                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-4 ${
                      selectedPaymentMethod === 'zelle'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                    } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedPaymentMethod === 'zelle' ? 'bg-blue-600' : 'bg-gray-100'
                    }`}>
                      <span className="text-xl font-bold text-white">Z</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Zelle</p>
                      <p className="text-sm text-gray-600">Pago rápido y seguro con Zelle</p>
                    </div>
                    {selectedPaymentMethod === 'zelle' && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </motion.button>
                </div>

                {submitting && (
                  <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-sm text-gray-600">Procesando cita...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Modal de Éxito */}
      {showSuccessModal && createdAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Cita Agendada con Éxito!
              </h3>
              <p className="text-gray-600 mb-6">
                Te hemos enviado un correo electrónico con los detalles de tu cita.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Fecha:</p>
                    <p className="text-sm text-gray-900 capitalize">
                      {selectedDate && formatDisplayDate(selectedDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Horarios:</p>
                    <p className="text-sm text-gray-900">
                      {createdAppointment.times.join(', ')} ({createdAppointment.times.length} hora{createdAppointment.times.length > 1 ? 's' : ''})
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Total pagado:</p>
                    <p className="text-sm font-bold text-blue-600">
                      ${createdAppointment.totalPrice.toFixed(2)} USD
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowSuccessModal(false);
                  setFormData({ name: '', email: '', phone: '', notes: '' });
                  setSelectedDate(null);
                  setSelectedTimes([]);
                  setSuccess(false);
                  setSelectedPaymentMethod(null);
                  setCreatedAppointment(null);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Entendido
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
      </div>
    </PayPalScriptProvider>
  );
}

