// src/components/SelectVendor.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const SelectVendor = ({ setSelectedVendor }) => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/usuarios');
        const filteredVendors = response.data.filter(vendor => vendor.tipo_usuario === 'vendedor');

        // Verifica la estructura de los datos
        console.log(filteredVendors); // Verifica los datos aquí

        // Mapea los datos a las opciones del select
        const vendorOptions = filteredVendors.map(vendor => ({
          value: vendor.id_usuario_persona,
          label: `${vendor.login || 'Nombre no disponible'}`, // Cambia esto si tienes otro campo para el nombre
        }));
        
        setVendors(vendorOptions);
      } catch (error) {
        console.error('Error al obtener vendedores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  return (
    <div>
      <h2>Selecciona un Vendedor</h2>
      {loading ? (
        <p>Cargando vendedores...</p>
      ) : (
        <Select
          options={vendors}
          onChange={(option) => setSelectedVendor(option.value)}
          placeholder="Seleccione un vendedor"
          isClearable
        />
      )}
    </div>
  );
};

export default SelectVendor;
