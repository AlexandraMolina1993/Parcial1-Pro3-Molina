const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Para que el frontend pueda comunicarse con el backend

// Configuración de la conexión
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Tu usuario de MySQL
    password: '',      // Tu contraseña de MySQL
    database: 'peluqueria_alex'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// --- ENDPOINTS API REST ---

// GET: Obtener todas las citas
app.get('/citas', (req, res) => {
    db.query('SELECT * FROM citas', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// POST: Crear cita con estado
app.post('/citas', (req, res) => {
    const { cliente, servicio, fecha, estado } = req.body;
    db.query('INSERT INTO citas (cliente, servicio, fecha, estado) VALUES (?, ?, ?, ?)', 
    [cliente, servicio, fecha, estado || 'Pendiente'], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, ...req.body });
    });
});

// PUT: Actualizar incluyendo estado
app.put('/citas/:id', (req, res) => {
    const { cliente, servicio, fecha, estado } = req.body;
    db.query('UPDATE citas SET cliente = ?, servicio = ?, fecha = ?, estado = ? WHERE id = ?',
    [cliente, servicio, fecha, estado, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Actualizado" });
    });
});

// BUSCAR POR ID (El que faltaba)
app.get('/citas/:id', (req, res) => {
    db.query('SELECT * FROM citas WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// DELETE: Eliminar una cita
app.delete('/citas/:id', (req, res) => {
    db.query('DELETE FROM citas WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Cita eliminada" });
    });
});


// BUSCAR POR NOMBRE (Usa LIKE para búsquedas parciales)
app.get('/citas/buscar/nombre', (req, res) => {
    const nombre = req.query.nombre;
    db.query('SELECT * FROM citas WHERE cliente LIKE ?', [`%${nombre}%`], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// BUSCAR POR FECHA (Solo la parte de la fecha, ignorando la hora)
app.get('/citas/buscar/fecha', (req, res) => {
    const fecha = req.query.fecha;
    db.query('SELECT * FROM citas WHERE DATE(fecha) = ?', [fecha], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// BUSCAR POR CATEGORÍA
app.get('/citas/buscar/categoria', (req, res) => {
    const categoria = req.query.categoria;
    db.query('SELECT * FROM citas WHERE servicio = ?', [categoria], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));