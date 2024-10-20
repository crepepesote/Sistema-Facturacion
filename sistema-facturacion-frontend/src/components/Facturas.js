// src/components/Facturas.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Facturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [filtroPersona, setFiltroPersona] = useState('');
  const [nuevaFactura, setNuevaFactura] = useState({
    id_metodo_pago: '',
    id_persona: '',
    fecha_factura: '',
    total_factura: '',
    id_vendedor: '',
    numero_factura: ''
  });
  const [editandoFactura, setEditandoFactura] = useState(null);

  useEffect(() => {
    cargarFacturas();
    cargarPersonas();
  }, []);

  const cargarFacturas = () => {
    axios.get('http://localhost:3000/api/facturas')
      .then(response => setFacturas(response.data))
      .catch(error => console.error('Error fetching facturas:', error));
  };

  const cargarPersonas = () => {
    axios.get('http://localhost:3000/api/personas')
      .then(response => setPersonas(response.data))
      .catch(error => console.error('Error fetching personas:', error));
  };

  const crearFactura = () => {
    axios.post('http://localhost:3000/api/facturas', nuevaFactura)
      .then(() => {
        cargarFacturas();
        setNuevaFactura({
          id_metodo_pago: '',
          id_persona: '',
          fecha_factura: '',
          total_factura: '',
          id_vendedor: '',
          numero_factura: ''
        });
      })
      .catch(error => console.error('Error creating factura:', error));
  };

  const actualizarFactura = () => {
    axios.put(`http://localhost:3000/api/facturas/${editandoFactura.id_factura}`, editandoFactura)
      .then(() => {
        cargarFacturas();
        setEditandoFactura(null);
      })
      .catch(error => console.error('Error updating factura:', error));
  };

  const eliminarFactura = (id) => {
    axios.delete(`http://localhost:3000/api/facturas/${id}`)
      .then(() => cargarFacturas())
      .catch(error => console.error('Error deleting factura:', error));
  };

  const facturasFiltradas = facturas.filter(factura => 
    filtroPersona ? factura.id_persona.toString() === filtroPersona : true
  );

  return (
    <div>
      <h1>Facturas</h1>
      
      {/* Filtro por persona */}
      <select value={filtroPersona} onChange={(e) => setFiltroPersona(e.target.value)}>
        <option value="">Todas las personas</option>
        {personas.map(persona => (
          <option key={persona.id_persona} value={persona.id_persona}>
            {persona.nombre_per} {persona.apellido_per}
          </option>
        ))}
      </select>

      {/* Formulario para crear/editar factura */}
      <form onSubmit={(e) => {
        e.preventDefault();
        editandoFactura ? actualizarFactura() : crearFactura();
      }}>
        <input
          type="number"
          placeholder="ID Método de Pago"
          value={editandoFactura ? editandoFactura.id_metodo_pago : nuevaFactura.id_metodo_pago}
          onChange={(e) => editandoFactura 
            ? setEditandoFactura({...editandoFactura, id_metodo_pago: e.target.value})
            : setNuevaFactura({...nuevaFactura, id_metodo_pago: e.target.value})}
        />
        <input
          type="number"
          placeholder="ID Persona"
          value={editandoFactura ? editandoFactura.id_persona : nuevaFactura.id_persona}
          onChange={(e) => editandoFactura 
            ? setEditandoFactura({...editandoFactura, id_persona: e.target.value})
            : setNuevaFactura({...nuevaFactura, id_persona: e.target.value})}
        />
        <input
          type="date"
          placeholder="Fecha Factura"
          value={editandoFactura ? editandoFactura.fecha_factura : nuevaFactura.fecha_factura}
          onChange={(e) => editandoFactura 
            ? setEditandoFactura({...editandoFactura, fecha_factura: e.target.value})
            : setNuevaFactura({...nuevaFactura, fecha_factura: e.target.value})}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Total Factura"
          value={editandoFactura ? editandoFactura.total_factura : nuevaFactura.total_factura}
          onChange={(e) => editandoFactura 
            ? setEditandoFactura({...editandoFactura, total_factura: e.target.value})
            : setNuevaFactura({...nuevaFactura, total_factura: e.target.value})}
        />
        <input
          type="number"
          placeholder="ID Vendedor"
          value={editandoFactura ? editandoFactura.id_vendedor : nuevaFactura.id_vendedor}
          onChange={(e) => editandoFactura 
            ? setEditandoFactura({...editandoFactura, id_vendedor: e.target.value})
            : setNuevaFactura({...nuevaFactura, id_vendedor: e.target.value})}
        />
        <input
          type="text"
          placeholder="Número Factura"
          value={editandoFactura ? editandoFactura.numero_factura : nuevaFactura.numero_factura}
          onChange={(e) => editandoFactura 
            ? setEditandoFactura({...editandoFactura, numero_factura: e.target.value})
            : setNuevaFactura({...nuevaFactura, numero_factura: e.target.value})}
        />
        <button type="submit">{editandoFactura ? 'Actualizar' : 'Crear'} Factura</button>
      </form>

      {/* Lista de facturas */}
      <ul>
        {facturasFiltradas.length > 0 ? (
          facturasFiltradas.map(factura => (
            <li key={factura.id_factura}>
              Factura #{factura.numero_factura} - Total: {factura.total_factura}
              <button onClick={() => setEditandoFactura(factura)}>Editar</button>
              <button onClick={() => eliminarFactura(factura.id_factura)}>Eliminar</button>
            </li>
          ))
        ) : (
          <li>No hay facturas disponibles.</li>
        )}
      </ul>
    </div>
  );
};

export default Facturas;