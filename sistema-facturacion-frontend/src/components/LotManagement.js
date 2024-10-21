// src/components/LotManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LotManagement = () => {
  const [lots, setLots] = useState([]);

  useEffect(() => {
    const fetchLots = async () => {
      const response = await axios.get('http://localhost:3000/api/lotes'); // Cambia la ruta según tu backend
      setLots(response.data);
    };
    fetchLots();
  }, []);

  return (
    <div>
      <h2>Información de Lotes</h2>
      <table>
        <thead>
          <tr>
            <th>ID Lote</th>
            <th>Número de Lote</th>
          </tr>
        </thead>
        <tbody>
          {lots.map(lot => (
            <tr key={lot.id_lote}>
              <td>{lot.id_lote}</td>
              <td>{lot.numero_lote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LotManagement;
