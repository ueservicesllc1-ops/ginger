'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Calendar as CalendarIcon, X } from 'lucide-react';
import Calendar from '@/components/Calendar';
import { getAvailabilitySettings, saveAvailabilitySettings } from '@/utils/firestore-appointments';
import { AvailabilitySettings } from '@/types/appointment';

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00',
];

export default function AdminAvailabilityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [specificDates, setSpecificDates] = useState<{
    [date: string]: { available: boolean; timeSlots: string[] };
  }>({});
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [newBlockedDate, setNewBlockedDate] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [pricePerHour, setPricePerHour] = useState<number>(25.00);

  useEffect(() => {
    // La autenticación se maneja en el layout
    loadSettings();
  }, [router]);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const settings = await getAvailabilitySettings();
      
      if (settings) {
        setSpecificDates(settings.specificDates || {});
        setBlockedDates(settings.blockedDates || []);
        setPricePerHour(settings.pricePerHour || 25.00);
      }
    } catch (error) {
      console.error('Error cargando configuración:', error);
    } finally {
      setLoading(false);
    }
  };

  const addBlockedDate = () => {
    if (newBlockedDate && !blockedDates.includes(newBlockedDate)) {
      setBlockedDates([...blockedDates, newBlockedDate].sort());
      setNewBlockedDate('');
    }
  };

  const removeBlockedDate = (date: string) => {
    setBlockedDates(blockedDates.filter((d) => d !== date));
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const dateStr = formatDate(date);
    // Si la fecha no tiene configuración específica, inicializarla vacía
    if (!specificDates[dateStr] && !blockedDates.includes(dateStr)) {
      setSpecificDates({
        ...specificDates,
        [dateStr]: {
          available: true,
          timeSlots: [],
        },
      });
    }
  };

  const toggleSpecificTimeSlot = (dateStr: string, timeSlot: string) => {
    const current = specificDates[dateStr] || { available: true, timeSlots: [] };
    const timeSlots = current.timeSlots.includes(timeSlot)
      ? current.timeSlots.filter((t) => t !== timeSlot)
      : [...current.timeSlots, timeSlot];
    
    setSpecificDates({
      ...specificDates,
      [dateStr]: {
        ...current,
        timeSlots: timeSlots.sort(),
      },
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveAvailabilitySettings({
        pricePerHour: pricePerHour,
        defaultAvailability: {}, // Ya no usamos disponibilidad por día de semana
        specificDates,
        blockedDates,
      });
      alert('Configuración guardada exitosamente');
    } catch (error: any) {
      alert('Error al guardar: ' + (error.message || 'Error desconocido'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando configuración...</p>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Configurar Disponibilidad</h1>
            <p className="text-gray-600 mt-1">Define los días y horarios disponibles para citas</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Precio por Hora - Compacto */}
            <div className="flex items-center gap-2 bg-white rounded-lg border-2 border-gray-200 px-4 py-2">
              <label htmlFor="pricePerHour" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Precio/hora:
              </label>
              <div className="flex items-center gap-1">
                <span className="text-gray-500">$</span>
                <input
                  type="number"
                  id="pricePerHour"
                  min="0"
                  step="0.01"
                  value={pricePerHour}
                  onChange={(e) => setPricePerHour(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 rounded border border-gray-300 focus:border-blue-500 focus:outline-none text-sm font-semibold"
                  placeholder="25.00"
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={saving}
              className="bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Guardando...' : 'Guardar Configuración'}
            </motion.button>
          </div>
        </div>
      </div>

      <div className="space-y-6">

        {/* Calendario y Horarios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendario para fechas específicas */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-blue-600" />
              Seleccionar Fecha
            </h2>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-4">
                Selecciona una fecha en el calendario para configurar sus horarios disponibles
              </p>
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                unavailableDates={blockedDates}
              />
            </div>
          </div>

          {/* Horarios disponibles */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-blue-600" />
              Horarios Disponibles
            </h2>

            {selectedDate ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full"
              >
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Fecha seleccionada:</p>
                  <p className="font-semibold text-gray-900 capitalize">
                    {selectedDate.toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-3 font-medium">Selecciona los horarios disponibles:</p>
                  <div className="grid grid-cols-3 gap-2 max-h-[500px] overflow-y-auto">
                    {TIME_SLOTS.map((timeSlot) => {
                      const dateStr = formatDate(selectedDate);
                      const isSelected = specificDates[dateStr]?.timeSlots.includes(timeSlot) || false;
                      return (
                        <motion.button
                          key={timeSlot}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleSpecificTimeSlot(dateStr, timeSlot)}
                          className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {timeSlot}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[400px] text-center">
                <div>
                  <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Selecciona una fecha en el calendario</p>
                  <p className="text-sm text-gray-400 mt-2">para configurar sus horarios</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fechas bloqueadas */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <X className="w-6 h-6 text-red-600" />
            Fechas Bloqueadas
          </h2>

          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="date"
                value={newBlockedDate}
                onChange={(e) => setNewBlockedDate(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                min={new Date().toISOString().split('T')[0]}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addBlockedDate}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Bloquear
              </motion.button>
            </div>

            {blockedDates.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Fechas bloqueadas:</p>
                <div className="space-y-2">
                  {blockedDates.map((date) => (
                    <motion.div
                      key={date}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg p-3"
                    >
                      <span className="text-sm text-gray-900">
                        {new Date(date).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <button
                        onClick={() => removeBlockedDate(date)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

