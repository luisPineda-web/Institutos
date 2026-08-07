const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

console.log('🔄 Iniciando servidor...');

// CONEXIÓN A MYSQL
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',        // ⚠️ Cambia si es necesario
    password: 'root',        // ⚠️ Cambia si tienes contraseña
    database: 'test'     // ⚠️ Cambia por tu base de datos
});

db.connect((err) => {
    if (err) {
        console.log('❌ ERROR DE MYSQL:');
        console.log('   Mensaje:', err.message);
        return;
    }
    console.log('✅ Conectado a MySQL en puerto 3306');
});

// ENDPOINTS
app.get('/api/usuarios', (req, res) => {
    console.log('📥 GET /api/usuarios');
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('❌ Error:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(`✅ Enviando ${results.length} usuarios`);
        res.json(results);
    });
});

app.post('/api/usuarios', (req, res) => {
    const { nombre, email } = req.body;
    console.log('📥 POST /api/usuarios', { nombre, email });
    
    if (!nombre || !email) {
        res.status(400).json({ error: 'Faltan campos' });
        return;
    }
    
    db.query(
        'INSERT INTO usuarios (nombre, email) VALUES (?, ?)',
        [nombre, email],
        (err, result) => {
            if (err) {
                console.error('❌ Error:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            console.log('✅ Usuario agregado ID:', result.insertId);
            res.json({ id: result.insertId, nombre, email });
        }
    );
});

// INICIAR SERVIDOR
app.listen(3000, () => {
    console.log('\n🚀 SERVICIO BACKEND INICIADO');
    console.log('   http://localhost:3000');
    console.log('\n📋 ENDPOINTS:');
    console.log('   GET  http://localhost:3000/api/usuarios');
    console.log('   POST http://localhost:3000/api/usuarios');
    console.log('\n✅ Esperando peticiones...\n');
});