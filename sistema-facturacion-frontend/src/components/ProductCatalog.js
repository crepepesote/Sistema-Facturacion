// src/components/ProductCatalog.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCatalog = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/productos');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Catálogo de Productos</h2>
      <ul>
        {products.map(product => (
          <li key={`${product.id_producto}-${product.id_lote}`}>
            {product.nombre_pro} - {product.descripcion_pro} - 
            Lote: {product.id_lote} - ${product.precio_compra_producto_lote}
            <button onClick={() => addToCart(product)}>Agregar al carrito</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCatalog;
