// src/components/Auth.js
import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', credentials);
      
      // Aquí añadimos el console.log para ver qué devuelve la API
      console.log('Datos recibidos del servidor:', response.data);

      setUser(response.data); // Esto actualiza el estado del usuario
    } catch (error) {
      console.error('Error de autenticación:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Usuario"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Auth;