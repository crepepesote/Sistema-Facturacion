import React from 'react';
import { useLocation } from 'react-router-dom';

const Invoice = () => {
  const location = useLocation();
  const { invoiceData } = location.state || {};
  const { sellerName } = location.state || {};


  if (!invoiceData) {
    return <p>No hay datos de la factura disponibles.</p>;
  }

  const {id_metodo_pago, id_factura, numero_factura, fecha_factura, total_factura, id_vendedor, productos } = invoiceData;

  return (
    <div>
      <h2>Factura #{numero_factura || 'N/A'}</h2>
      <p><strong>ID de Factura:</strong> {id_factura || 'N/A'}</p>
      <p><strong>Fecha:</strong> {fecha_factura || 'N/A'}</p>
      <p><strong>ID del Vendedor:</strong> {id_vendedor|| 'N/A'}</p>
      <h3>Productos:</h3>
      {Array.isArray(productos) && productos.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((item, index) => (
              <tr key={item.id_producto || index}>
                <td>{item.nombre_pro || 'N/A'}</td>
                <td>{item.quantity || 0}</td>
                <td>${item.precio_compra_producto_lote || 0}</td>
                <td>${(item.precio_compra_producto_lote || 0) * (item.quantity || 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay productos disponibles</p>
      )}
      <p><strong>Total:</strong> ${total_factura || 0}</p>

      <p><strong>Metodo de pago:</strong> {id_metodo_pago|| 0} - Efectivo</p>
    </div>
  );
};

export default Invoice;