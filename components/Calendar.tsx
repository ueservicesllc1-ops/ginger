'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  unavailableDates?: string[]; // Array de fechas en formato "YYYY-MM-DD"
  minDate?: Date;
  maxDate?: Date;
}

export default function Calendar({
  selectedDate,
  onDateSelect,
  unavailableDates = [],
  minDate,
  maxDate,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isDateDisabled = (date: Date): boolean => {
    const dateStr = formatDate(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // No permitir fechas pasadas
    if (date < today) {
      return true;
    }
    
    // Verificar límites
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    
    // Verificar si está en la lista de no disponibles
    return unavailableDates.includes(dateStr);
  };

  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return formatDate(date) === formatDate(selectedDate);
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (!isDateDisabled(date)) {
      onDateSelect(date);
    }
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header del calendario */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Mes anterior"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <h3 className="text-xl font-bold text-gray-900">
          {monthNames[month]} {year}
        </h3>
        
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Mes siguiente"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Días del mes */}
      <div className="grid grid-cols-7 gap-2">
        {/* Espacios vacíos al inicio */}
        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {/* Días del mes */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const date = new Date(year, month, day);
          const disabled = isDateDisabled(date);
          const selected = isDateSelected(date);
          const today = isToday(date);

          return (
            <motion.button
              key={day}
              onClick={() => handleDateClick(day)}
              disabled={disabled}
              whileHover={!disabled ? { scale: 1.1 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              className={`
                aspect-square rounded-lg text-sm font-medium transition-all
                ${disabled
                  ? 'text-gray-300 cursor-not-allowed bg-gray-50'
                  : selected
                  ? 'bg-blue-600 text-white shadow-lg'
                  : today
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {day}
            </motion.button>
          );
        })}
      </div>

      {/* Leyenda */}
      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-600" />
          <span>Seleccionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-100" />
          <span>Hoy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-50" />
          <span>No disponible</span>
        </div>
      </div>
    </div>
  );
}


