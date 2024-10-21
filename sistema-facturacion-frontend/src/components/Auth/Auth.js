// src/components/Auth.js 
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import { toast } from 'react-hot-toast';

const Auth = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', credentials);
      console.log('Datos recibidos del servidor:', response.data);

      setUser(response.data);
      toast.success('¡Bienvenido!'); // Mostrar mensaje de éxito
    } catch (error) {
      console.error('Error de autenticación:', error.response ? error.response.data : error.message);
      toast.error('Error de autenticación. Por favor, verifica tus credenciales.'); // Mostrar mensaje de error
    }
  };
  
  return (
    <div className="container">
      <div className="form-background">
        <h1>Iniciar sesión</h1>
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
          <input type="submit" value="Ingresar" />
        </form>
        <p className="sign-up-divider">o inicia con</p>
        <div className="social-media">
          <ul className="social-media-icons">
            <li className="google">
              <a href="g"><i className="fab fa-google-plus-g"></i></a>
            </li>
            <li className="facebook">
              <a href="f"><i className="fab fa-facebook-f"></i></a>
            </li>
            <li className="twitter">
              <a href="t"><i className="fab fa-twitter"></i></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="login">
        <p>¿Necesitas una cuenta?<a href="r">Registrarse</a></p>
      </div>
    </div>
  );
};

export default Auth;
