import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ nombre_pro: '', descripcion_pro: '', unidad_pro: '' });
  const [editingProductId, setEditingProductId] = useState(null);

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

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProductId) {
        // Actualizar producto
        await axios.put(`http://localhost:3000/api/productos/${editingProductId}`, newProduct);
        setProducts(products.map(product => (product.id_producto === editingProductId ? { ...product, ...newProduct } : product)));
        setEditingProductId(null);
      } else {
        // Crear nuevo producto
        const response = await axios.post('http://localhost:3000/api/productos', newProduct);
        setProducts([...products, response.data]);
      }
      setNewProduct({ nombre_pro: '', descripcion_pro: '', unidad_pro: '' });
    } catch (error) {
      console.error('Error creando o actualizando producto:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditProduct = (product) => {
    setNewProduct({ nombre_pro: product.nombre_pro, descripcion_pro: product.descripcion_pro, unidad_pro: product.unidad_pro });
    setEditingProductId(product.id_producto);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/productos/${id}`);
      setProducts(products.filter(product => product.id_producto !== id));
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddOrUpdateProduct}>
        <input 
          placeholder="Nombre del Producto" 
          value={newProduct.nombre_pro} 
          onChange={(e) => setNewProduct({ ...newProduct, nombre_pro: e.target.value })} 
          required 
        />
        <input 
          placeholder="Descripción" 
          value={newProduct.descripcion_pro} 
          onChange={(e) => setNewProduct({ ...newProduct, descripcion_pro: e.target.value })} 
          required 
        />
        <select 
          value={newProduct.unidad_pro} 
          onChange={(e) => setNewProduct({ ...newProduct, unidad_pro: e.target.value })}
          required
        >
          <option value="" disabled>Seleccione una unidad</option>
          <option value="gramo">Gramo</option>
          <option value="kg">Kilogramo</option>
          <option value="libra">Libra</option>
          <option value="litro">Litro</option>
          <option value="ml">Mililitro</option>
        </select>
        <button type="submit">{editingProductId ? 'Actualizar Producto' : 'Agregar Producto'}</button>
      </form>

      {/* Tabla de productos */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Unidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id_producto}>
              <td>{product.nombre_pro}</td>
              <td>{product.descripcion_pro}</td>
              <td>{product.unidad_pro}</td>
              <td>
                <button onClick={() => handleEditProduct(product)}>Editar</button>
                <button onClick={() => handleDeleteProduct(product.id_producto)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
