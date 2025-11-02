'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function TermsAndConditionsPage() {
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
            Términos y Condiciones
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-sm sm:prose-base max-w-none space-y-8 text-gray-700">
            {/* Introducción */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Aceptación de los Términos</h2>
              <p>
                Bienvenido a Ginbri Store. Al acceder y utilizar este sitio web, usted acepta cumplir con estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
              </p>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en este sitio. Su uso continuado del sitio después de cualquier modificación constituye su aceptación de los nuevos términos.
              </p>
            </section>

            {/* Uso del sitio */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Uso del Sitio Web</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1. Elegibilidad</h3>
              <p>
                Usted debe tener al menos 18 años de edad para realizar una compra en nuestro sitio. Si es menor de 18 años, solo puede utilizar este sitio con el consentimiento y supervisión de un padre o tutor legal.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.2. Cuenta de Usuario</h3>
              <p>
                Para realizar una compra, puede ser necesario crear una cuenta. Usted es responsable de:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Mantener la confidencialidad de su contraseña</li>
                <li>Proporcionar información precisa, actual y completa</li>
                <li>Notificarnos inmediatamente de cualquier uso no autorizado de su cuenta</li>
                <li>Aceptar responsabilidad por todas las actividades que ocurran bajo su cuenta</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.3. Uso Prohibido</h3>
              <p>Usted se compromete a no:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Utilizar el sitio para fines ilegales o no autorizados</li>
                <li>Intentar obtener acceso no autorizado a sistemas o redes</li>
                <li>Interferir con el funcionamiento del sitio</li>
                <li>Realizar actividades que puedan dañar, deshabilitar o sobrecargar el sitio</li>
                <li>Utilizar bots, scripts automatizados o métodos similares</li>
                <li>Copiar, modificar o distribuir el contenido del sitio sin autorización</li>
              </ul>
            </section>

            {/* Productos y precios */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Productos y Precios</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.1. Información del Producto</h3>
              <p>
                Nos esforzamos por proporcionar información precisa sobre nuestros productos, incluyendo descripciones, imágenes y precios. Sin embargo, no garantizamos que la información del sitio sea completa, precisa o actualizada en todo momento.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.2. Precios</h3>
              <p>
                Todos los precios están expresados en dólares estadounidenses (USD) a menos que se indique lo contrario. Nos reservamos el derecho de modificar los precios en cualquier momento sin previo aviso. Los precios aplicables son los mostrados en el momento de realizar el pedido.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.3. Disponibilidad</h3>
              <p>
                La disponibilidad de productos está sujeta a cambios sin previo aviso. Si un producto que ha pedido no está disponible, nos pondremos en contacto con usted para informarle y ofrecerle alternativas o un reembolso completo.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.4. Errores</h3>
              <p>
                En el caso de que un producto se liste a un precio incorrecto debido a un error tipográfico, nos reservamos el derecho de rechazar o cancelar cualquier pedido realizado a ese precio incorrecto. Si ya se ha procesado el pago, le reembolsaremos el monto completo.
              </p>
            </section>

            {/* Pedidos y pagos */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Pedidos y Pagos</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.1. Realización de Pedidos</h3>
              <p>
                Al realizar un pedido, usted hace una oferta para comprar productos a los precios y condiciones establecidos. Recibirá una confirmación por correo electrónico una vez que aceptemos su pedido. Esta confirmación no constituye una aceptación de su oferta, sino un reconocimiento de que hemos recibido su pedido.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.2. Aceptación de Pedidos</h3>
              <p>
                Nos reservamos el derecho de aceptar o rechazar cualquier pedido por cualquier motivo, incluyendo, pero no limitado a:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Disponibilidad del producto</li>
                <li>Errores en la información del producto o precio</li>
                <li>Problemas identificados por nuestro sistema de prevención de fraude</li>
                <li>Limitaciones de cantidad por cliente</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.3. Métodos de Pago</h3>
              <p>
                Aceptamos diversos métodos de pago seguros. Todos los pagos se procesan a través de procesadores de pago seguros. Al proporcionar información de pago, usted garantiza que tiene el derecho legal de utilizar el método de pago seleccionado.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.4. Verificación de Pago</h3>
              <p>
                Podemos solicitar información adicional para verificar su identidad o validar su método de pago antes de procesar su pedido. Si no proporcionamos esta información dentro de un plazo razonable, podemos cancelar su pedido.
              </p>
            </section>

            {/* Envío y entrega */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Envío y Entrega</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5.1. Tiempos de Envío</h3>
              <p>
                Procesamos los pedidos dentro de 1-2 días hábiles después de la confirmación del pago. Los tiempos de entrega estimados se proporcionan en el momento del pedido y son solo estimaciones. No garantizamos tiempos de entrega específicos.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5.2. Costos de Envío</h3>
              <p>
                Los costos de envío se calculan en función del peso, dimensiones y destino del pedido. El envío es gratuito para pedidos superiores a $50 (USD). Se aplicarán cargos adicionales para envíos internacionales y entregas exprés.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5.3. Dirección de Entrega</h3>
              <p>
                Usted es responsable de proporcionar una dirección de envío precisa. No somos responsables de pedidos perdidos o entregados incorrectamente debido a direcciones incorrectas o incompletas proporcionadas por usted.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5.4. Riesgo de Pérdida</h3>
              <p>
                El riesgo de pérdida y el título de los productos se transfieren a usted cuando los productos son entregados al transportista. Una vez que los productos salen de nuestras instalaciones, no somos responsables de retrasos o daños causados por el transportista.
              </p>
            </section>

            {/* Devoluciones y reembolsos */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Devoluciones y Reembolsos</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">6.1. Política de Devolución</h3>
              <p>
                Aceptamos devoluciones de productos no utilizados y en su condición original dentro de los 30 días posteriores a la fecha de entrega. Los productos deben estar en su embalaje original y acompañados del recibo o comprobante de compra.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">6.2. Productos No Elegibles para Devolución</h3>
              <p>Los siguientes productos no son elegibles para devolución:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Productos personalizados o hechos a medida</li>
                <li>Productos perecederos</li>
                <li>Productos de software o digitales que ya han sido utilizados</li>
                <li>Productos dañados por uso indebido</li>
                <li>Productos devueltos después del período de devolución de 30 días</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">6.3. Proceso de Devolución</h3>
              <p>
                Para iniciar una devolución, contáctenos a través de nuestro servicio al cliente. Proporcionaremos instrucciones sobre cómo devolver el producto. El cliente es responsable de los costos de envío de la devolución, a menos que el producto esté defectuoso o sea incorrecto.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">6.4. Reembolsos</h3>
              <p>
                Una vez recibido y verificado el producto devuelto, procesaremos su reembolso dentro de 5-10 días hábiles. El reembolso se realizará utilizando el mismo método de pago utilizado para la compra original. Los costos de envío originales no son reembolsables, excepto en casos de productos defectuosos o incorrectos.
              </p>
            </section>

            {/* Garantías */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Garantías y Limitación de Responsabilidad</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">7.1. Garantía de Productos</h3>
              <p>
                Los productos vendidos a través de nuestro sitio están sujetos a las garantías del fabricante cuando corresponda. No proporcionamos garantías adicionales más allá de las proporcionadas por el fabricante.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">7.2. Limitación de Responsabilidad</h3>
              <p>
                En la medida máxima permitida por la ley, Ginbri Store no será responsable por daños indirectos, incidentales, especiales o consecuentes resultantes del uso o la incapacidad de usar nuestros productos o servicios, incluso si hemos sido advertidos de la posibilidad de tales daños.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">7.3. Responsabilidad Máxima</h3>
              <p>
                Nuestra responsabilidad total hacia usted por cualquier reclamo relacionado con nuestros productos o servicios no excederá el monto que pagó por los productos o servicios en cuestión.
              </p>
            </section>

            {/* Propiedad intelectual */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Propiedad Intelectual</h2>
              <p>
                Todo el contenido de este sitio web, incluyendo pero no limitado a textos, gráficos, logotipos, iconos, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de Ginbri Store o sus proveedores de contenido y está protegido por leyes de derechos de autor y otras leyes de propiedad intelectual.
              </p>
              <p className="mt-4">
                Usted no puede reproducir, distribuir, modificar, crear trabajos derivados, mostrar públicamente, ejecutar públicamente, republicar, descargar, almacenar o transmitir ningún material de nuestro sitio sin nuestro permiso previo por escrito.
              </p>
            </section>

            {/* Enlaces a terceros */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Enlaces a Sitios de Terceros</h2>
              <p>
                Nuestro sitio puede contener enlaces a sitios web de terceros que no son propiedad ni están controlados por nosotros. No somos responsables del contenido, políticas de privacidad o prácticas de ningún sitio de terceros. Le recomendamos que lea los términos y condiciones y las políticas de privacidad de cualquier sitio de terceros que visite.
              </p>
            </section>

            {/* Indemnización */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnización</h2>
              <p>
                Usted acepta indemnizar, defender y eximir de responsabilidad a Ginbri Store, sus afiliados, oficiales, directores, empleados y agentes de cualquier reclamo, responsabilidad, daño, pérdida y gasto (incluidos honorarios de abogados) que surjan de o estén relacionados con:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Su uso del sitio web o servicios</li>
                <li>Su violación de estos Términos y Condiciones</li>
                <li>Su violación de los derechos de cualquier tercero</li>
                <li>Cualquier contenido que publique o transmita a través del sitio</li>
              </ul>
            </section>

            {/* Rescisión */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Rescisión</h2>
              <p>
                Nos reservamos el derecho de terminar o suspender su acceso a nuestro sitio web y servicios, con o sin causa o aviso, por cualquier motivo, incluyendo, pero no limitado a, una violación de estos Términos y Condiciones.
              </p>
              <p className="mt-4">
                En caso de rescisión, su derecho a utilizar el sitio cesará inmediatamente. Las disposiciones de estos términos que por su naturaleza deben sobrevivir, incluyendo disposiciones de propiedad, limitación de responsabilidad e indemnización, permanecerán en vigor después de cualquier rescisión.
              </p>
            </section>

            {/* Ley aplicable */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Ley Aplicable y Jurisdicción</h2>
              <p>
                Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de [Jurisdicción], sin tener en cuenta sus disposiciones sobre conflictos de leyes. Cualquier disputa que surja de o esté relacionada con estos términos será sometida a la jurisdicción exclusiva de los tribunales de [Jurisdicción].
              </p>
            </section>

            {/* Disposiciones generales */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Disposiciones Generales</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">13.1. Integridad del Acuerdo</h3>
              <p>
                Estos Términos y Condiciones constituyen el acuerdo completo entre usted y Ginbri Store con respecto al uso del sitio web y reemplazan todos los acuerdos anteriores o contemporáneos.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">13.2. Divisibilidad</h3>
              <p>
                Si alguna disposición de estos términos se considera inválida o inaplicable, las disposiciones restantes permanecerán en pleno vigor y efecto.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">13.3. Renuncia</h3>
              <p>
                Nuestra falta de ejercer o hacer valer cualquier derecho o disposición de estos términos no constituirá una renuncia a tal derecho o disposición.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">13.4. Asignación</h3>
              <p>
                No puede asignar o transferir estos términos sin nuestro consentimiento previo por escrito. Nosotros podemos asignar estos términos a cualquier parte sin restricción.
              </p>
            </section>

            {/* Contacto */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contacto</h2>
              <p className="mb-4">
                Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos a través de:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-2"><strong>Email:</strong> legal@ginbristore.com</p>
                <p className="mb-2"><strong>Teléfono:</strong> +1 (234) 567-890</p>
                <p className="mb-2"><strong>Dirección:</strong> [Dirección de la empresa]</p>
                <p>
                  Estamos disponibles para responder sus consultas de lunes a viernes, de 9:00 AM a 6:00 PM.
                </p>
              </div>
            </section>

            {/* Aceptación */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Aceptación de los Términos</h2>
              <p>
                Al utilizar nuestro sitio web y servicios, usted reconoce que ha leído, entendido y acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, debe dejar de utilizar nuestros servicios de inmediato.
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

