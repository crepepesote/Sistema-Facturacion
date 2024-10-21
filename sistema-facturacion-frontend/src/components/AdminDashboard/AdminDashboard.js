import React, { useState } from 'react';
import Sidebar from './Sidebar';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';
import './AdminDashboard.css';
import 'boxicons/css/boxicons.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('users'); // Controla qué sección está activa

  const handleMenuClick = (section) => {
    setActiveSection(section); // Cambia la sección activa al hacer clic en el menú
  };

  return (
    <div className="admin-dashboard">
      {/* Navbar Superior */}
      <nav className="navbar">
        <div className="logo_item">
          <i className="bx bx-menu" id="sidebarOpen"></i>
          <img src="/assets/image.png" alt="Perfil" className="profile" />TechShop
        </div>

        <div className="navbar_content">
          <i className="bi bi-grid"></i> {/* Icono de cuadrícula */}
          <i className='bx bx-sun' id="darkLight"></i> {/* Modo oscuro */}
          <i className='bx bx-bell'></i> {/* Notificaciones */}
          <img src="/assets/profile.jpg" alt="Perfil" className="profile" /> {/* Imagen de perfil */}
        </div>
      </nav>

      {/* Contenido de la página con el sidebar */}
      <Sidebar onMenuClick={handleMenuClick} />
      
      <div className="dashboard-content">
        {activeSection === 'users' && (
          <div>
            <h1>Gestión de Usuarios</h1>
            <UserManagement />
          </div>
        )}
        {activeSection === 'products' && (
          <div>
            <h1>Gestión de Productos</h1>
            <ProductManagement />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
