// src/components/AdminDashboard.js
import React from 'react';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <UserManagement />
      <ProductManagement />
      {/* Aquí puedes añadir el componente para manejar lotes si lo necesitas */}
    </div>
  );
};

export default AdminDashboard;
