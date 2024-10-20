const express = require('express');
const app = express();
const db = require('./db'); // Importa la conexión a la base de datos
const routes = require('./routes');
const cors = require('cors');

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3001', // Permitir solo desde este origen
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware para manejar JSON
app.use(express.json());

// Usar las rutas
app.use('/api', routes);

// Ruta de prueba para verificar la conexión
app.get('/test-db', (req, res) => {
  db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      res.status(500).send('Error al ejecutar la consulta.');
      console.error(err);
    } else {
      res.send(`La solución es: ${results[0].solution}`);
    }
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
