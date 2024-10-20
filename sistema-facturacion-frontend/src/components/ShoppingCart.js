// src/components/ShoppingCart.js
import React from 'react';

const ShoppingCart = ({ cart, removeFromCart, proceedToCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.precio_compra_producto_lote * item.quantity, 0);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id_producto}>
            {item.nombre_pro} - Cantidad: {item.quantity} - ${item.precio_compra_producto_lote * item.quantity}
            <button onClick={() => removeFromCart(item.id_producto)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <p>Total: ${total}</p>
      <button onClick={proceedToCheckout}>Proceder al Pago</button>
    </div>
  );
};

export default ShoppingCart;
