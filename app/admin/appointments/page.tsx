'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar as CalendarIcon, Clock, User, Mail, Phone, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { getAppointments, updateAppointment } from '@/utils/firestore-appointments';
import { Appointment } from '@/types/appointment';

export default function AdminAppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    // La autenticación se maneja en el layout
    loadAppointments();
  }, [router]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error cargando citas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId: string, newStatus: Appointment['status']) => {
    try {
      await updateAppointment(appointmentId, { status: newStatus });
      await loadAppointments();
    } catch (error: any) {
      alert('Error al actualizar la cita: ' + (error.message || 'Error desconocido'));
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      completed: 'Completada',
      cancelled: 'Cancelada',
    };
    return texts[status] || status;
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Volver al Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Citas</h1>
            <p className="text-gray-600 mt-1">Administra las citas de Personal Shopper</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex gap-2">
            {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
              <motion.button
                key={status}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'Todas' : getStatusText(status)}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Cargando citas...</p>
        </div>
      )}

      {/* Lista de citas */}
      {!loading && (
        <div className="space-y-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Información del cliente */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Cliente
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-900 font-medium">{appointment.customerName}</p>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{appointment.customerEmail}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{appointment.customerPhone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fecha y hora */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-blue-600" />
                      Cita
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-900">
                        <CalendarIcon className="w-4 h-4" />
                        <span className="capitalize">{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones</h3>
                    <div className="space-y-2">
                      {appointment.status === 'pending' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Confirmar
                        </motion.button>
                      )}
                      {appointment.status === 'confirmed' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStatusChange(appointment.id, 'completed')}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Marcar como Completada
                        </motion.button>
                      )}
                      {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancelar
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>

                {appointment.notes && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Notas:</strong> {appointment.notes}
                    </p>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No hay citas {filter !== 'all' ? `con estado "${getStatusText(filter)}"` : ''}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


