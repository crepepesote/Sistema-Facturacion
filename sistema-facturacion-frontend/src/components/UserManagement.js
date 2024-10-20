import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // Función para obtener usuarios
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/usuarios');
      setUsers(response.data);
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Login</th>
            <th>Tipo de Usuario</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id_usuario_persona}>
              <td>{user.id_usuario_persona}</td>
              <td>{user.login}</td>
              <td>{user.tipo_usuario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
