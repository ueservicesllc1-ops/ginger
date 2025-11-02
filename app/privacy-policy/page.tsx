'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
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
            Política de Privacidad
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-sm sm:prose-base max-w-none space-y-8 text-gray-700">
            {/* Introducción */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introducción</h2>
              <p>
                En Ginbri Store, nos comprometemos a proteger su privacidad y garantizar la seguridad de sus datos personales. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos su información personal cuando utiliza nuestro sitio web y servicios.
              </p>
              <p>
                Al utilizar nuestros servicios, usted acepta las prácticas descritas en esta política. Si no está de acuerdo con alguna parte de esta política, le recomendamos que no utilice nuestros servicios.
              </p>
            </section>

            {/* Información que recopilamos */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Información que Recopilamos</h2>
              <p className="font-semibold mb-2">Recopilamos los siguientes tipos de información:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1. Información Personal</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nombre completo</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Dirección de envío y facturación</li>
                <li>Información de pago (procesada de forma segura a través de proveedores de pago)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.2. Información de Uso</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dirección IP</li>
                <li>Tipo de navegador y dispositivo</li>
                <li>Páginas visitadas y tiempo de permanencia</li>
                <li>Búsquedas realizadas en nuestro sitio</li>
                <li>Referencias de sitios web</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.3. Cookies y Tecnologías Similares</h3>
              <p>
                Utilizamos cookies y tecnologías similares para mejorar su experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido. Puede gestionar sus preferencias de cookies a través de la configuración de su navegador.
              </p>
            </section>

            {/* Uso de la información */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cómo Utilizamos su Información</h2>
              <p className="mb-2">Utilizamos la información recopilada para los siguientes propósitos:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Procesar y cumplir con sus pedidos</li>
                <li>Comunicarnos con usted sobre su cuenta y pedidos</li>
                <li>Enviar confirmaciones de pedido y actualizaciones de envío</li>
                <li>Proporcionar soporte al cliente</li>
                <li>Mejorar nuestros productos y servicios</li>
                <li>Personalizar su experiencia de compra</li>
                <li>Enviar comunicaciones de marketing (con su consentimiento)</li>
                <li>Prevenir fraudes y mejorar la seguridad</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            {/* Compartir información */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Compartir su Información</h2>
              <p className="mb-2">No vendemos su información personal. Compartimos su información solo en las siguientes circunstancias:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.1. Proveedores de Servicios</h3>
              <p>
                Compartimos información con proveedores de servicios que nos ayudan a operar nuestro negocio, como procesadores de pago, servicios de envío, servicios de alojamiento y proveedores de servicios de marketing. Estos proveedores solo utilizan su información para los fines especificados y están obligados a proteger su privacidad.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.2. Requisitos Legales</h3>
              <p>
                Podemos divulgar su información si es requerido por ley, orden judicial, proceso legal o solicitud gubernamental, o para proteger nuestros derechos, propiedad o seguridad, o la de nuestros clientes.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.3. Transferencias Comerciales</h3>
              <p>
                En caso de una fusión, adquisición o venta de activos, su información puede ser transferida como parte de la transacción.
              </p>
            </section>

            {/* Seguridad */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Seguridad de los Datos</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Esto incluye:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Encriptación SSL/TLS para todas las transacciones</li>
                <li>Almacenamiento seguro de datos</li>
                <li>Control de acceso limitado a información personal</li>
                <li>Monitoreo regular de sistemas de seguridad</li>
                <li>Cumplimiento con estándares de seguridad de la industria</li>
              </ul>
              <p className="mt-4">
                Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro. Aunque nos esforzamos por proteger su información, no podemos garantizar su seguridad absoluta.
              </p>
            </section>

            {/* Sus derechos */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Sus Derechos</h2>
              <p className="mb-2">Usted tiene los siguientes derechos respecto a su información personal:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Acceso:</strong> Puede solicitar acceso a sus datos personales</li>
                <li><strong>Rectificación:</strong> Puede solicitar la corrección de datos inexactos</li>
                <li><strong>Eliminación:</strong> Puede solicitar la eliminación de sus datos personales</li>
                <li><strong>Oposición:</strong> Puede oponerse al procesamiento de sus datos</li>
                <li><strong>Portabilidad:</strong> Puede solicitar la transferencia de sus datos</li>
                <li><strong>Retirar consentimiento:</strong> Puede retirar su consentimiento en cualquier momento</li>
              </ul>
              <p className="mt-4">
                Para ejercer estos derechos, puede contactarnos a través de la información de contacto proporcionada al final de esta política.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies y Tecnologías de Seguimiento</h2>
              <p>
                Utilizamos cookies para mejorar su experiencia de navegación. Los tipos de cookies que utilizamos incluyen:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio</li>
                <li><strong>Cookies de rendimiento:</strong> Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio</li>
                <li><strong>Cookies de funcionalidad:</strong> Permiten que el sitio recuerde sus preferencias</li>
                <li><strong>Cookies de marketing:</strong> Se utilizan para mostrar anuncios relevantes (con su consentimiento)</li>
              </ul>
              <p className="mt-4">
                Puede gestionar sus preferencias de cookies a través de la configuración de su navegador. Tenga en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio.
              </p>
            </section>

            {/* Menores de edad */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacidad de Menores</h2>
              <p>
                Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos conscientemente información personal de menores de edad. Si descubrimos que hemos recopilado información de un menor sin el consentimiento de los padres, tomaremos medidas para eliminar esa información inmediatamente.
              </p>
            </section>

            {/* Cambios a la política */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cambios a esta Política</h2>
              <p>
                Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Le notificaremos sobre cambios importantes publicando la nueva política en esta página y actualizando la fecha de "Última actualización". Le recomendamos que revise esta política periódicamente para mantenerse informado sobre cómo protegemos su información.
              </p>
            </section>

            {/* Retención de datos */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Retención de Datos</h2>
              <p>
                Conservamos su información personal durante el tiempo necesario para cumplir con los propósitos descritos en esta política, a menos que la ley requiera o permita un período de retención más largo. Cuando eliminemos su información personal, lo haremos de manera segura usando métodos apropiados.
              </p>
            </section>

            {/* Transferencias internacionales */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Transferencias Internacionales de Datos</h2>
              <p>
                Su información puede ser transferida y procesada en países distintos al suyo. Al utilizar nuestros servicios, usted consiente la transferencia de su información a estos países. Tomamos medidas apropiadas para garantizar que su información esté protegida de acuerdo con esta política, independientemente de dónde se procese.
              </p>
            </section>

            {/* Contacto */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contacto</h2>
              <p className="mb-4">
                Si tiene preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad o el manejo de su información personal, puede contactarnos a través de:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-2"><strong>Email:</strong> privacy@ginbristore.com</p>
                <p className="mb-2"><strong>Teléfono:</strong> +1 (234) 567-890</p>
                <p className="mb-2"><strong>Dirección:</strong> [Dirección de la empresa]</p>
                <p>
                  Nos comprometemos a responder a sus consultas en un plazo razonable.
                </p>
              </div>
            </section>

            {/* Consentimiento */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Consentimiento</h2>
              <p>
                Al utilizar nuestro sitio web y servicios, usted consiente la recopilación y el uso de su información según se describe en esta Política de Privacidad. Si no está de acuerdo con esta política, le recomendamos que no utilice nuestros servicios.
              </p>
            </section>
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

