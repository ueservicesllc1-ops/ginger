'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function ReturnPolicyPage() {
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
            Política de Devoluciones
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-sm sm:prose-base max-w-none space-y-8 text-gray-700">
            {/* Introducción */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introducción</h2>
              <p>
                En Ginbri Store, nos comprometemos a garantizar su satisfacción con cada compra. Si no está completamente satisfecho con su pedido, puede devolver los productos según los términos y condiciones descritos en esta política.
              </p>
              <p>
                Esta Política de Devoluciones establece los términos y condiciones bajo los cuales puede devolver productos comprados en nuestro sitio web. Al realizar una compra, usted acepta estar sujeto a esta política.
              </p>
            </section>

            {/* Período de devolución */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Período de Devolución</h2>
              <p>
                Tiene <strong>30 días calendario</strong> desde la fecha de entrega para solicitar una devolución. Este período se aplica a todos los productos elegibles, a menos que se especifique lo contrario.
              </p>
              <p className="mt-4">
                Para iniciar una devolución, debe contactarnos dentro de este período de 30 días. Una vez que recibamos su solicitud, le proporcionaremos instrucciones sobre cómo proceder con la devolución.
              </p>
            </section>

            {/* Condiciones de devolución */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Condiciones de los Productos para Devolución</h2>
              <p className="mb-2">Para que un producto sea elegible para devolución, debe cumplir con las siguientes condiciones:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.1. Estado del Producto</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>El producto debe estar sin usar y en su condición original</li>
                <li>Debe incluirse todo el empaque original, manuales y accesorios</li>
                <li>Las etiquetas y etiquetas de precio deben estar intactas</li>
                <li>El producto no debe mostrar signos de uso, desgaste o daño</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.2. Comprobante de Compra</h3>
              <p>
                Debe incluir el recibo original, comprobante de compra o número de orden. Sin este documento, no podremos procesar su devolución.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.3. Embalaje Original</h3>
              <p>
                El producto debe devolverse en su embalaje original cuando sea posible. Si el embalaje original no está disponible, debe usar un embalaje apropiado para proteger el producto durante el envío.
              </p>
            </section>

            {/* Productos no elegibles */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Productos No Elegibles para Devolución</h2>
              <p className="mb-2">Los siguientes productos <strong>NO</strong> son elegibles para devolución:</p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Productos personalizados o hechos a medida:</strong> Artículos que han sido personalizados según sus especificaciones</li>
                <li><strong>Productos perecederos:</strong> Alimentos, flores frescas y productos con fecha de caducidad</li>
                <li><strong>Productos de software o digitales:</strong> Códigos de software, descargas digitales o licencias que ya han sido activadas</li>
                <li><strong>Productos íntimos o de higiene personal:</strong> Ropa interior, productos de higiene personal sellados que han sido abiertos</li>
                <li><strong>Productos dañados por uso indebido:</strong> Artículos que han sido dañados por uso incorrecto, negligencia o accidente</li>
                <li><strong>Productos devueltos después del período de 30 días:</strong> Cualquier artículo devuelto después del período permitido</li>
                <li><strong>Productos de venta final:</strong> Artículos marcados como "venta final" o "no reembolsable"</li>
                <li><strong>Gift cards y tarjetas de regalo:</strong> Tarjetas de regalo no son elegibles para devolución o reembolso</li>
              </ul>
            </section>

            {/* Proceso de devolución */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Proceso de Devolución</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5.1. Paso 1: Contactar al Servicio al Cliente</h3>
              <p>
                Para iniciar una devolución, debe contactarnos a través de:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Email:</strong> returns@ginbristore.com</li>
                <li><strong>Teléfono:</strong> +1 (234) 567-890</li>
                <li><strong>Chat en línea:</strong> Disponible en nuestro sitio web</li>
              </ul>
              <p className="mt-4">
                Proporcione el número de orden y una descripción del producto que desea devolver, junto con el motivo de la devolución.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5.2. Paso 2: Autorización de Devolución</h3>
              <p>
                Revisaremos su solicitud y le enviaremos una autorización de devolución (RMA - Return Merchandise Authorization) por correo electrónico dentro de 2-3 días hábiles. Este número de autorización es necesario para procesar su devolución.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5.3. Paso 3: Empaque y Envío</h3>
              <p>
                Una vez recibida la autorización, empacque el producto de forma segura junto con:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>El número de autorización de devolución (RMA)</li>
                <li>El recibo original o comprobante de compra</li>
                <li>Todos los accesorios y componentes originales</li>
              </ul>
              <p className="mt-4">
                Envíe el paquete a la dirección que le proporcionaremos. Recomendamos usar un servicio de envío con seguro y número de seguimiento.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5.4. Paso 4: Recepción e Inspección</h3>
              <p>
                Una vez que recibamos el producto, lo inspeccionaremos para verificar que cumple con nuestras condiciones de devolución. Este proceso puede tomar 3-5 días hábiles.
              </p>
            </section>

            {/* Reembolsos */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Proceso de Reembolso</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">6.1. Aprobación de Devolución</h3>
              <p>
                Si el producto cumple con nuestras condiciones de devolución, aprobaremos la devolución y procesaremos su reembolso.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">6.2. Tiempo de Procesamiento</h3>
              <p>
                Procesaremos su reembolso dentro de <strong>5-10 días hábiles</strong> después de recibir y aprobar el producto devuelto. El tiempo que tarda el reembolso en aparecer en su cuenta puede variar según su banco o proveedor de tarjeta de crédito (generalmente 3-5 días hábiles adicionales).
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">6.3. Método de Reembolso</h3>
              <p>
                El reembolso se realizará utilizando el mismo método de pago que utilizó para la compra original:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Tarjeta de crédito/débito:</strong> El reembolso aparecerá en su estado de cuenta</li>
                <li><strong>PayPal:</strong> El reembolso se enviará a su cuenta de PayPal</li>
                <li><strong>Transferencia bancaria:</strong> El reembolso se transferirá a la cuenta bancaria proporcionada</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">6.4. Monto del Reembolso</h3>
              <p>
                El monto del reembolso incluirá el precio de compra del producto. Sin embargo, tenga en cuenta:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Los costos de envío originales <strong>NO</strong> son reembolsables, excepto en casos de productos defectuosos o incorrectos</li>
                <li>Los costos de envío de devolución corren por cuenta del cliente, a menos que el producto esté defectuoso o sea incorrecto</li>
                <li>Si recibió un descuento o promoción, el reembolso será por el monto pagado después del descuento</li>
              </ul>
            </section>

            {/* Productos defectuosos o incorrectos */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Productos Defectuosos o Incorrectos</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">7.1. Productos Defectuosos</h3>
              <p>
                Si recibe un producto defectuoso o dañado, contáctenos inmediatamente. En estos casos:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Le proporcionaremos una etiqueta de envío prepagada para devolver el producto</li>
                <li>Cubriremos todos los costos de envío</li>
                <li>Procesaremos un reembolso completo o un reemplazo, según su preferencia</li>
                <li>Le ofreceremos disculpas y una solución rápida</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">7.2. Productos Incorrectos</h3>
              <p>
                Si recibe un producto diferente al que ordenó, contáctenos de inmediato. Procederemos de la misma manera que con productos defectuosos: cubriremos todos los costos y enviaremos el producto correcto o procesaremos un reembolso completo.
              </p>
            </section>

            {/* Intercambios */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intercambios</h2>
              <p>
                Actualmente no ofrecemos intercambios directos. Si desea un producto diferente o en un tamaño o color diferente, debe:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-2">
                <li>Devolver el producto original según nuestra política de devolución</li>
                <li>Realizar una nueva compra del producto deseado</li>
              </ol>
              <p className="mt-4">
                Procesaremos el reembolso del producto devuelto una vez que recibamos y aprobemos la devolución. El nuevo pedido se procesará como una compra separada.
              </p>
            </section>

            {/* Costos de envío de devolución */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Costos de Envío de Devolución</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">9.1. Devoluciones Estándar</h3>
              <p>
                El cliente es responsable de los costos de envío de devolución, a menos que:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>El producto recibido esté defectuoso</li>
                <li>Se haya enviado el producto incorrecto</li>
                <li>El producto no coincida con la descripción del sitio web</li>
                <li>Haya un error de nuestra parte en el pedido</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">9.2. Devoluciones Cubiertas por Nosotros</h3>
              <p>
                En los casos mencionados anteriormente, proporcionaremos una etiqueta de envío prepagada y cubriremos todos los costos asociados con la devolución.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">9.3. Recomendaciones de Envío</h3>
              <p>
                Recomendamos usar un servicio de envío con seguro y número de seguimiento para proteger su paquete durante el transporte. No somos responsables de productos perdidos o dañados durante el envío de devolución si no se utiliza un servicio con seguimiento.
              </p>
            </section>

            {/* Rechazo de devoluciones */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Rechazo de Devoluciones</h2>
              <p>
                Nos reservamos el derecho de rechazar una devolución si:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>El producto no cumple con nuestras condiciones de devolución</li>
                <li>El producto ha sido devuelto después del período de 30 días</li>
                <li>El producto no está en su condición original o ha sido usado</li>
                <li>Falta el empaque original, accesorios o manuales</li>
                <li>No se proporciona el comprobante de compra</li>
                <li>El producto está en nuestra lista de productos no elegibles</li>
              </ul>
              <p className="mt-4">
                Si rechazamos su devolución, le notificaremos el motivo y le devolveremos el producto a su cuenta (a su cargo), o podemos disponer del producto si no se coordina la devolución dentro de 30 días.
              </p>
            </section>

            {/* Devoluciones de regalos */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Devoluciones de Regalos</h2>
              <p>
                Si recibió un producto como regalo y desea devolverlo:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Necesita el número de orden o comprobante de compra del regalo</li>
                <li>El reembolso se procesará como crédito de tienda o se reembolsará al método de pago original del comprador</li>
                <li>Se aplican los mismos períodos y condiciones de devolución</li>
              </ul>
            </section>

            {/* Cancelaciones */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Cancelaciones de Pedidos</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">12.1. Antes del Envío</h3>
              <p>
                Si desea cancelar un pedido antes de que se envíe, contáctenos de inmediato. Si el pedido aún no ha sido procesado, podemos cancelarlo y procesar un reembolso completo sin cargo.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">12.2. Después del Envío</h3>
              <p>
                Una vez que un pedido ha sido enviado, no puede ser cancelado. Debe seguir nuestro proceso de devolución estándar después de recibir el producto.
              </p>
            </section>

            {/* Contacto */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contacto para Devoluciones</h2>
              <p className="mb-4">
                Para iniciar una devolución o hacer consultas sobre nuestra política de devoluciones, puede contactarnos a través de:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-2"><strong>Email:</strong> returns@ginbristore.com</p>
                <p className="mb-2"><strong>Teléfono:</strong> +1 (234) 567-890</p>
                <p className="mb-2"><strong>Horario de Atención:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
                <p className="mb-2"><strong>Chat en Línea:</strong> Disponible en nuestro sitio web</p>
                <p>
                  Nuestro equipo de atención al cliente está listo para ayudarlo con cualquier consulta relacionada con devoluciones.
                </p>
              </div>
            </section>

            {/* Cambios a la política */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Cambios a esta Política</h2>
              <p>
                Nos reservamos el derecho de modificar esta Política de Devoluciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en esta página. Le recomendamos que revise esta política periódicamente para mantenerse informado sobre cualquier cambio.
              </p>
              <p className="mt-4">
                Si realiza un pedido antes de que se publiquen los cambios, se aplicará la política vigente en el momento de su compra.
              </p>
            </section>

            {/* Preguntas frecuentes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Preguntas Frecuentes</h2>
              
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">¿Puedo devolver un producto después de 30 días?</h3>
                  <p className="text-gray-600">
                    Por lo general, no aceptamos devoluciones después de 30 días. Sin embargo, podemos hacer excepciones en casos especiales. Contáctenos para discutir su situación.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">¿Cuánto tiempo tarda el reembolso?</h3>
                  <p className="text-gray-600">
                    Procesamos reembolsos dentro de 5-10 días hábiles después de recibir y aprobar el producto. El tiempo adicional para que aparezca en su cuenta depende de su banco o procesador de pagos.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">¿Puedo cambiar un producto en lugar de devolverlo?</h3>
                  <p className="text-gray-600">
                    Actualmente no ofrecemos intercambios directos. Debe devolver el producto y realizar una nueva compra del artículo deseado.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">¿Qué pasa si mi producto llega dañado?</h3>
                  <p className="text-gray-600">
                    Si recibe un producto dañado, contáctenos de inmediato. Le proporcionaremos una etiqueta de envío prepagada y procesaremos un reembolso completo o un reemplazo.
                  </p>
                </div>
              </div>
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

