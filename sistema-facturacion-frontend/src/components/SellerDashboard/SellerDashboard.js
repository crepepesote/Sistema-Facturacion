import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './SellerDashboard.css';
import 'boxicons/css/boxicons.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProductCatalog from '../ProductCatalog'; // Asegúrate de que este componente exista
import ShoppingCart from '../ShoppingCart'; // Asegúrate de que este componente exista
import SelectVendor from '../SelectVendor'; // Asegúrate de importar SelectVendor

const SellerDashboard = ({ user }) => {
  const [activeSection, setActiveSection] = useState('invoice');
  const [cart, setCart] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id_producto === product.id_producto);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id_producto === product.id_producto
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id_producto) => {
    setCart((prevCart) => prevCart.filter((item) => item.id_producto !== id_producto));
  };

  const handleGenerateInvoice = (invoiceData) => {
    console.log("Generando factura con los datos:", invoiceData);
    // Aquí puedes agregar la lógica para enviar los datos a la API
  };

  return (
    <div className="seller-dashboard">
      {/* Navbar Superior */}
      <nav className="navbar">
        <div className="logo_item">
          <i className="bx bx-menu" id="sidebarOpen"></i>
          <img src="/assets/image.png" alt="Perfil" className="profile" />TechShop
        </div>

        <div className="navbar_content">
          <i className="bi bi-grid"></i>
          <i className='bx bx-sun' id="darkLight"></i>
          <i className='bx bx-bell'></i>
          <img src="/assets/profile.jpg" alt="Perfil" className="profile" />
        </div>
      </nav>

      {/* Contenido de la página con el sidebar */}
      <Sidebar onMenuClick={handleMenuClick} />
      
      <div className="dashboard-content">
        {activeSection === 'invoice' && (
          <div>
            <h1>Crear factura</h1>
            {/* Componente para seleccionar el vendedor */}
            <SelectVendor setSelectedVendor={setSelectedVendor} />
            <ProductCatalog addToCart={addToCart} />
            <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
            <InvoiceForm onGenerateInvoice={handleGenerateInvoice} cart={cart} />
          </div>
        )}
        {/* Puedes agregar otras secciones aquí si es necesario */}
      </div>
    </div>
  );
};

// Componente para el formulario de generación de factura
const InvoiceForm = ({ onGenerateInvoice, cart }) => {
  const [invoiceData, setInvoiceData] = useState({
    cliente: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para generar la factura
    onGenerateInvoice({ ...invoiceData, productos: cart }); // Incluye el carrito en los datos de la factura
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="cliente"
        placeholder="Nombre del Cliente"
        value={invoiceData.cliente}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Generar Factura</button>
    </form>
  );
};

export default SellerDashboard;
