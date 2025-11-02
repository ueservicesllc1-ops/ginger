'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqCategories = [
  {
    id: 'general',
    title: 'Preguntas Generales',
    items: [
      {
        question: '¿Qué es Ginbri Store?',
        answer: 'Ginbri Store es una tienda en línea dedicada a ofrecer productos de alta calidad con envío rápido y seguro. Nuestro objetivo es brindar una experiencia de compra excepcional con productos cuidadosamente seleccionados y un servicio al cliente de primera clase.'
      },
      {
        question: '¿Cómo puedo crear una cuenta?',
        answer: 'Actualmente, puede realizar compras sin necesidad de crear una cuenta. Sin embargo, puede proporcionar su información durante el proceso de checkout. Estamos trabajando en un sistema de cuentas que estará disponible próximamente.'
      },
      {
        question: '¿Dónde están ubicados?',
        answer: 'Somos una tienda en línea que atiende a clientes en múltiples ubicaciones. Puede contactarnos para obtener más información sobre nuestras oficinas y centros de distribución.'
      },
      {
        question: '¿Cómo puedo contactar al servicio al cliente?',
        answer: 'Puede contactarnos a través de email a info@ginbristore.com, por teléfono al +1 (234) 567-890, o utilizando nuestro chat en línea disponible en el sitio web. Nuestro horario de atención es de lunes a viernes, de 9:00 AM a 6:00 PM.'
      }
    ]
  },
  {
    id: 'products',
    title: 'Productos y Pedidos',
    items: [
      {
        question: '¿Cómo puedo buscar productos?',
        answer: 'Puede buscar productos utilizando la barra de búsqueda en la parte superior de la página de productos, o navegar por categorías. También puede filtrar productos por categoría para encontrar exactamente lo que necesita.'
      },
      {
        question: '¿Los productos tienen garantía?',
        answer: 'Sí, todos nuestros productos están cubiertos por la garantía del fabricante. Además, ofrecemos garantía de satisfacción. Si no está satisfecho con su compra, puede devolver el producto dentro de 30 días según nuestra Política de Devoluciones.'
      },
      {
        question: '¿Puedo realizar un pedido por teléfono?',
        answer: 'Sí, puede llamarnos al +1 (234) 567-890 durante nuestro horario de atención y nuestro equipo de servicio al cliente estará encantado de ayudarle a realizar su pedido por teléfono.'
      },
      {
        question: '¿Puedo modificar o cancelar mi pedido?',
        answer: 'Puede cancelar su pedido antes de que sea enviado contactándonos inmediatamente. Una vez que el pedido ha sido enviado, debe seguir nuestro proceso de devolución estándar. Las modificaciones de pedidos no son posibles después de la confirmación, pero puede realizar una nueva compra.'
      },
      {
        question: '¿Cómo sé si un producto está en stock?',
        answer: 'La disponibilidad del producto se muestra en cada página de producto. Si un producto está agotado, se mostrará claramente y no podrá agregarlo al carrito. También mostramos cuando quedan pocas unidades disponibles.'
      }
    ]
  },
  {
    id: 'shipping',
    title: 'Envíos y Entregas',
    items: [
      {
        question: '¿Cuáles son los tiempos de entrega?',
        answer: 'Los tiempos de entrega varían según su ubicación. Procesamos los pedidos dentro de 1-2 días hábiles después de la confirmación del pago. El tiempo de entrega estimado se muestra durante el proceso de checkout. Generalmente, las entregas locales toman 2-5 días hábiles, mientras que las entregas internacionales pueden tomar 7-15 días hábiles.'
      },
      {
        question: '¿Cuánto cuesta el envío?',
        answer: 'El envío es gratuito para pedidos superiores a $50 USD. Para pedidos menores a $50, el costo de envío se calcula en función del peso, dimensiones y destino del pedido. Los costos exactos se muestran durante el proceso de checkout antes de completar su compra.'
      },
      {
        question: '¿A qué países envían?',
        answer: 'Actualmente enviamos a la mayoría de los países. Si no está seguro si enviamos a su ubicación, puede contactarnos o intentar realizar un pedido de prueba durante el checkout, donde se le informará si podemos entregar a su dirección.'
      },
      {
        question: '¿Puedo rastrear mi pedido?',
        answer: 'Sí, una vez que su pedido haya sido enviado, recibirá un email con un número de seguimiento y un enlace para rastrear su paquete. También puede contactarnos para obtener información actualizada sobre el estado de su pedido.'
      },
      {
        question: '¿Qué pasa si no estoy en casa cuando llega el paquete?',
        answer: 'El servicio de entrega intentará entregar el paquete en la dirección proporcionada. Si no hay nadie disponible, dejarán una notificación con instrucciones para recoger el paquete o programar una nueva entrega. Asegúrese de proporcionar una dirección donde alguien pueda recibir el paquete durante el horario de entrega.'
      },
      {
        question: '¿Puedo cambiar la dirección de envío después de realizar el pedido?',
        answer: 'Si su pedido aún no ha sido enviado, podemos modificar la dirección de envío. Contáctenos inmediatamente con su número de orden y la nueva dirección. Una vez que el pedido ha sido enviado, no podemos cambiar la dirección de entrega.'
      }
    ]
  },
  {
    id: 'payment',
    title: 'Pagos',
    items: [
      {
        question: '¿Qué métodos de pago aceptan?',
        answer: 'Aceptamos todas las principales tarjetas de crédito y débito (Visa, Mastercard, American Express), PayPal, y transferencias bancarias. Todos los pagos se procesan de forma segura a través de procesadores de pago encriptados.'
      },
      {
        question: '¿Es seguro pagar en línea?',
        answer: 'Absolutamente. Utilizamos tecnología de encriptación SSL/TLS para proteger toda la información de pago. Todos los datos de tarjeta de crédito se procesan a través de procesadores de pago seguros y certificados. Nunca almacenamos información completa de tarjetas de crédito en nuestros servidores.'
      },
      {
        question: '¿Cuándo se cobrará mi tarjeta?',
        answer: 'Su tarjeta será cobrada inmediatamente cuando confirme su pedido. El monto se reservará de su cuenta y se procesará una vez que confirmemos el pedido.'
      },
      {
        question: '¿Puedo pagar con tarjeta de débito?',
        answer: 'Sí, aceptamos tarjetas de débito siempre que tengan las características de tarjeta de crédito (Visa, Mastercard). El proceso de pago es el mismo que para las tarjetas de crédito.'
      },
      {
        question: '¿Ofrecen planes de pago o financiamiento?',
        answer: 'Actualmente no ofrecemos planes de pago a plazos. Sin embargo, estamos evaluando agregar opciones de financiamiento en el futuro. Todos los pagos deben realizarse en su totalidad al momento de la compra.'
      }
    ]
  },
  {
    id: 'returns',
    title: 'Devoluciones y Reembolsos',
    items: [
      {
        question: '¿Cuánto tiempo tengo para devolver un producto?',
        answer: 'Tiene 30 días calendario desde la fecha de entrega para solicitar una devolución. Debe contactarnos dentro de este período para iniciar el proceso de devolución.'
      },
      {
        question: '¿Cuánto tiempo tarda el reembolso?',
        answer: 'Una vez que recibamos y aprobemos el producto devuelto, procesaremos su reembolso dentro de 5-10 días hábiles. El tiempo adicional para que aparezca en su cuenta depende de su banco o procesador de pagos, generalmente 3-5 días hábiles adicionales.'
      },
      {
        question: '¿Quién paga el costo de envío de la devolución?',
        answer: 'El cliente es responsable de los costos de envío de devolución, excepto en casos donde el producto esté defectuoso, sea incorrecto, o haya un error de nuestra parte. En esos casos, proporcionaremos una etiqueta de envío prepagada.'
      },
      {
        question: '¿Puedo cambiar un producto en lugar de devolverlo?',
        answer: 'Actualmente no ofrecemos intercambios directos. Si desea un producto diferente, debe devolver el producto original y realizar una nueva compra del artículo deseado.'
      },
      {
        question: '¿Qué productos no se pueden devolver?',
        answer: 'Productos personalizados, perecederos, software digital activado, productos de higiene personal abiertos, y productos dañados por uso indebido no son elegibles para devolución. Consulte nuestra Política de Devoluciones completa para más detalles.'
      }
    ]
  },
  {
    id: 'account',
    title: 'Cuenta y Privacidad',
    items: [
      {
        question: '¿Cómo puedo actualizar mi información personal?',
        answer: 'Puede actualizar su información de contacto comunicándose con nuestro servicio al cliente. Cuando el sistema de cuentas esté disponible, podrá actualizar su información directamente desde su cuenta.'
      },
      {
        question: '¿Cómo protegen mi información personal?',
        answer: 'Tomamos la privacidad de nuestros clientes muy en serio. Utilizamos medidas de seguridad avanzadas para proteger su información personal. Puede leer más detalles en nuestra Política de Privacidad.'
      },
      {
        question: '¿Comparten mi información con terceros?',
        answer: 'No vendemos su información personal. Solo compartimos información con proveedores de servicios que nos ayudan a operar nuestro negocio (procesadores de pago, servicios de envío) y estos están obligados a proteger su privacidad. Consulte nuestra Política de Privacidad para más información.'
      },
      {
        question: '¿Puedo solicitar que eliminen mi información?',
        answer: 'Sí, tiene derecho a solicitar la eliminación de su información personal. Puede contactarnos a privacy@ginbristore.com para ejercer este derecho. Procesaremos su solicitud según las leyes de protección de datos aplicables.'
      }
    ]
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (categoryId: string, itemIndex: number) => {
    const key = `${categoryId}-${itemIndex}`;
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Preguntas Frecuentes
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-8">
            Encuentre respuestas a las preguntas más comunes sobre nuestros productos, pedidos, envíos y más.
          </p>

          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <motion.section
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
                  {category.title}
                </h2>
                
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => {
                    const key = `${category.id}-${itemIndex}`;
                    const isOpen = openItems.has(key);
                    
                    return (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: categoryIndex * 0.1 + itemIndex * 0.05 }}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(category.id, itemIndex)}
                          className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-900 pr-4">
                            {item.question}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                            )}
                          </motion.div>
                        </button>
                        
                        <motion.div
                          initial={false}
                          animate={{
                            height: isOpen ? 'auto' : 0,
                            opacity: isOpen ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 text-gray-700 leading-relaxed">
                            {item.answer}
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            ))}
          </div>

          {/* Sección de ayuda adicional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¿No encontró su respuesta?
            </h2>
            <p className="text-gray-700 mb-6">
              Si no encuentra la respuesta que busca, nuestro equipo de atención al cliente está aquí para ayudarle.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Contáctenos:</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Email:</strong> info@ginbristore.com</li>
                <li><strong>Teléfono:</strong> +1 (234) 567-890</li>
                <li><strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</li>
                <li><strong>Chat en línea:</strong> Disponible en nuestro sitio web</li>
              </ul>
            </div>
          </motion.div>

          {/* Enlaces útiles */}
          <div className="mt-8 pt-8 border-t">
            <h3 className="font-semibold text-gray-900 mb-4">Enlaces Útiles:</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/privacy-policy"
                className="text-blue-600 hover:text-blue-700 underline text-sm"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-blue-600 hover:text-blue-700 underline text-sm"
              >
                Términos y Condiciones
              </Link>
              <Link
                href="/return-policy"
                className="text-blue-600 hover:text-blue-700 underline text-sm"
              >
                Política de Devoluciones
              </Link>
            </div>
          </div>

          {/* Botón de regreso */}
          <div className="mt-12 pt-8 border-t">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}


