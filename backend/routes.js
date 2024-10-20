const express = require('express');
const router = express.Router();
const db = require('./db'); // Tu conexión a MySQL

// Ruta de inicio de sesión
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `
    SELECT 
      USUARIO_PERSONA.id_usuario_persona, 
      PERSONA.nombre_per, 
      PERSONA.apellido_per, 
      USUARIO_PERSONA.tipo_usuario 
    FROM USUARIO_PERSONA
    JOIN PERSONA ON USUARIO_PERSONA.id_persona = PERSONA.id_persona
    WHERE USUARIO_PERSONA.login = ? AND USUARIO_PERSONA.clave = ?
  `;

  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    if (results.length > 0) {
      res.json({ 
        id: results[0].id_usuario_persona,
        nombre_per: results[0].nombre_per,
        apellido_per: results[0].apellido_per,
        tipo_usuario: results[0].tipo_usuario,
      });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  });
});

// Rutas para Productos
router.get('/productos', (req, res) => {
  const query = `
    SELECT p.id_producto, p.nombre_pro, p.descripcion_pro, pl.precio_compra_producto_lote, pl.id_lote
    FROM PRODUCTO p
    LEFT JOIN PRODUCTO_LOTE pl ON p.id_producto = pl.id_producto
    WHERE pl.id_lote IS NOT NULL OR pl.precio_compra_producto_lote > 0
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error obteniendo los productos.');
    }
    res.json(results);
  });
});

// Crear un nuevo producto
router.post('/productos', (req, res) => {
  const { nombre_pro, descripcion_pro, unidad_pro } = req.body; // Agrega unidad_pro si es necesario
  const nuevoProducto = { nombre_pro, descripcion_pro, unidad_pro }; // No incluyas id_producto

  db.query('INSERT INTO PRODUCTO SET ?', nuevoProducto, (err, result) => {
    if (err) {
      return res.status(500).send('Error creando el producto.');
    }
    res.json({ id_producto: result.insertId, ...nuevoProducto });
  });
});





// Actualizar un producto
router.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre_pro, descripcion_pro } = req.body;
  const productoActualizado = { nombre_pro, descripcion_pro };

  db.query('UPDATE PRODUCTO SET ? WHERE id_producto = ?', [productoActualizado, id], (err) => {
    if (err) {
      return res.status(500).send('Error actualizando el producto.');
    }
    res.send('Producto actualizado.');
  });
});

// Eliminar un producto
router.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM PRODUCTO WHERE id_producto = ?', [id], (err) => {
    if (err) {
      return res.status(500).send('Error eliminando el producto.');
    }
    res.send('Producto eliminado.');
  });
});

// Rutas para Usuarios
router.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM USUARIO_PERSONA', (err, results) => {
    if (err) {
      return res.status(500).send('Error obteniendo los usuarios.');
    }
    res.json(results);
  });
});

// Crear un nuevo usuario
router.post('/usuarios', async (req, res) => {
  const { documento_per, nombre_per, apellido_per, fecha_nacimiento, direccion_per, tipo_documento_per, telefono_per, correo_per, login, clave, tipo_usuario } = req.body;

  // Primero, inserta en la tabla PERSONA
  const nuevaPersona = { documento_per, nombre_per, apellido_per, fecha_nacimiento, direccion_per, tipo_documento_per, telefono_per, correo_per };
  
  db.query('INSERT INTO PERSONA SET ?', nuevaPersona, (err, result) => {
    if (err) {
      console.error('Error creando persona:', err);
      return res.status(500).send('Error creando la persona.');
    }

    const id_persona = result.insertId; // Obtén el id_persona generado

    // Ahora inserta en la tabla USUARIO_PERSONA
    const nuevoUsuario = { login, clave, tipo_usuario, id_persona };
    db.query('INSERT INTO USUARIO_PERSONA SET ?', nuevoUsuario, (err, result) => {
      if (err) {
        console.error('Error creando usuario:', err);
        return res.status(500).send('Error creando el usuario.');
      }
      res.json({ id_usuario_persona: result.insertId, ...nuevoUsuario });
    });
  });
});



// Actualizar un usuario
router.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { login, clave, nombre_per, apellido_per, tipo_usuario } = req.body;
  const usuarioActualizado = { login, clave, nombre_per, apellido_per, tipo_usuario };

  db.query('UPDATE USUARIO_PERSONA SET ? WHERE id_usuario_persona = ?', [usuarioActualizado, id], (err) => {
    if (err) {
      return res.status(500).send('Error actualizando el usuario.');
    }
    res.send('Usuario actualizado.');
  });
});

// Eliminar un usuario
router.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM USUARIO_PERSONA WHERE id_usuario_persona = ?', [id], (err) => {
    if (err) {
      return res.status(500).send('Error eliminando el usuario.');
    }
    res.send('Usuario eliminado.');
  });
});

// Ruta para obtener todas las facturas
router.get('/facturas', (req, res) => {
  db.query('SELECT * FROM FACTURA', (err, results) => {
    if (err) {
      return res.status(500).send('Error obteniendo las facturas.');
    }
    res.json(results);
  });
});

// Ruta para obtener una factura por ID
router.get('/facturas/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM FACTURA WHERE id_factura = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send('Error obteniendo la factura.');
    }
    res.json(results[0]);
  });
});
// Ruta para crear una nueva factura
router.post('/facturas', (req, res) => {
  const { id_metodo_pago, id_persona, fecha_factura, total_factura, id_vendedor, numero_factura, productos } = req.body;
  const nuevaFactura = { id_metodo_pago, id_persona, fecha_factura, total_factura, id_vendedor, numero_factura };
  
  db.query('INSERT INTO FACTURA SET ?', nuevaFactura, (err, result) => {
    if (err) {
      return res.status(500).send('Error creando la factura.');
    }
    
    const id_factura = result.insertId;
    
    // Insertar los productos de la factura
    const productosPromises = productos.map(producto => {
      return new Promise((resolve, reject) => {
        const detalleFactura = {
          id_factura: id_factura,
          id_producto: producto.id_producto,
          cantidad: producto.quantity,
          precio_unitario: producto.precio_compra_producto_lote
        };
        db.query('INSERT INTO DETALLE_FACTURA SET ?', detalleFactura, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    });
    
    Promise.all(productosPromises)
      .then(() => {
        res.json({ id_factura, ...nuevaFactura, productos });
      })
      .catch(error => {
        console.error('Error insertando los detalles de la factura:', error);
        res.status(500).send('Error creando los detalles de la factura.');
      });
  });
});

// Ruta para eliminar una factura
router.delete('/facturas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM FACTURA WHERE id_factura = ?', [id], (err) => {
    if (err) {
      return res.status(500).send('Error eliminando la factura.');
    }
    res.send('Factura eliminada.');
  });
});

module.exports = router;
