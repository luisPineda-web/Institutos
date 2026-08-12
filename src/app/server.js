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
    user: 'root',        // ⚠️ Tu usuario
    password: 'root',    // ⚠️ Tu contraseña
    database: 'test'     // ⚠️ Tu base de datos
});

db.connect((err) => {
    if (err) {
        console.log('❌ ERROR DE MYSQL:');
        console.log('   Mensaje:', err.message);
        return;
    }
    console.log('✅ Conectado a MySQL en puerto 3306');
    console.log('📚 Base de datos:', 'test');
});

// ============================================
// 📚 ENDPOINTS PARA USUARIOS (los que ya tenías)
// ============================================

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

// ============================================
// 🎓 ENDPOINTS PARA ESTUDIANTES (NUEVOS)
// ============================================

// 1. OBTENER TODOS LOS ESTUDIANTES
app.get('/api/estudiantes', (req, res) => {
    console.log('📥 GET /api/estudiantes');
    db.query('SELECT * FROM estudiantes ORDER BY id DESC', (err, results) => {
        if (err) {
            console.error('❌ Error:', err);
            res.status(500).json({ 
                success: false, 
                error: err.message 
            });
            return;
        }
        console.log(`✅ Enviando ${results.length} estudiantes`);
        res.json({ 
            success: true, 
            data: results 
        });
    });
});

// 2. OBTENER ESTUDIANTE POR ID
app.get('/api/estudiantes/:id', (req, res) => {
    const { id } = req.params;
    console.log(`📥 GET /api/estudiantes/${id}`);
    
    db.query('SELECT * FROM estudiantes WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('❌ Error:', err);
            res.status(500).json({ 
                success: false, 
                error: err.message 
            });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ 
                success: false, 
                message: 'Estudiante no encontrado' 
            });
            return;
        }
        res.json({ 
            success: true, 
            data: results[0] 
        });
    });
});

// 3. REGISTRAR NUEVO ESTUDIANTE
app.post('/api/estudiantes', (req, res) => {
    const { 
        cedula, nombre, apellido, email, telefono, 
        fecha_nacimiento, direccion, genero, carrera, 
        semestre, estado = 'activo' 
    } = req.body;
    
    console.log('📥 POST /api/estudiantes', { cedula, nombre, apellido, email });

    // Validaciones básicas
    if (!cedula || !nombre || !apellido || !email) {
        res.status(400).json({ 
            success: false, 
            message: 'Cédula, nombre, apellido y email son requeridos' 
        });
        return;
    }

    // Verificar si ya existe la cédula o email
    db.query(
        'SELECT * FROM estudiantes WHERE cedula = ? OR email = ?',
        [cedula, email],
        (err, results) => {
            if (err) {
                console.error('❌ Error:', err);
                res.status(500).json({ 
                    success: false, 
                    error: err.message 
                });
                return;
            }
            
            if (results.length > 0) {
                res.status(400).json({ 
                    success: false, 
                    message: 'La cédula o email ya están registrados' 
                });
                return;
            }

            // Insertar nuevo estudiante
            const insertQuery = `
                INSERT INTO estudiantes 
                (cedula, nombre, apellido, email, telefono, fecha_nacimiento, 
                 direccion, genero, carrera, semestre, estado) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                cedula, nombre, apellido, email, telefono || null,
                fecha_nacimiento || null, direccion || null, genero || null,
                carrera || null, semestre || null, estado
            ];

            db.query(insertQuery, values, (err, result) => {
                if (err) {
                    console.error('❌ Error al insertar:', err);
                    res.status(500).json({ 
                        success: false, 
                        error: err.message 
                    });
                    return;
                }
                
                console.log('✅ Estudiante registrado ID:', result.insertId);
                res.status(201).json({ 
                    success: true, 
                    message: 'Estudiante registrado exitosamente',
                    data: { id: result.insertId, ...req.body }
                });
            });
        }
    );
});

// 4. ACTUALIZAR ESTUDIANTE
app.put('/api/estudiantes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion, genero, carrera, semestre, estado } = req.body;
    
    console.log(`📥 PUT /api/estudiantes/${id}`);

    if (!nombre || !apellido || !email) {
        res.status(400).json({ 
            success: false, 
            message: 'Nombre, apellido y email son requeridos' 
        });
        return;
    }

    const updateQuery = `
        UPDATE estudiantes 
        SET nombre = ?, apellido = ?, email = ?, telefono = ?,
            direccion = ?, genero = ?, carrera = ?, semestre = ?, estado = ?
        WHERE id = ?
    `;

    const values = [nombre, apellido, email, telefono || null, direccion || null, 
                    genero || null, carrera || null, semestre || null, estado || 'activo', id];

    db.query(updateQuery, values, (err, result) => {
        if (err) {
            console.error('❌ Error al actualizar:', err);
            res.status(500).json({ 
                success: false, 
                error: err.message 
            });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ 
                success: false, 
                message: 'Estudiante no encontrado' 
            });
            return;
        }
        console.log('✅ Estudiante actualizado ID:', id);
        res.json({ 
            success: true, 
            message: 'Estudiante actualizado exitosamente' 
        });
    });
});

// 5. ELIMINAR ESTUDIANTE
app.delete('/api/estudiantes/:id', (req, res) => {
    const { id } = req.params;
    console.log(`📥 DELETE /api/estudiantes/${id}`);

    db.query('DELETE FROM estudiantes WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('❌ Error al eliminar:', err);
            res.status(500).json({ 
                success: false, 
                error: err.message 
            });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ 
                success: false, 
                message: 'Estudiante no encontrado' 
            });
            return;
        }
        console.log('✅ Estudiante eliminado ID:', id);
        res.json({ 
            success: true, 
            message: 'Estudiante eliminado exitosamente' 
        });
    });
});

// 6. BUSCAR ESTUDIANTES
app.get('/api/estudiantes/buscar/:termino', (req, res) => {
    const { termino } = req.params;
    console.log(`📥 GET /api/estudiantes/buscar/${termino}`);
    
    const searchTerm = `%${termino}%`;
    const query = `
        SELECT * FROM estudiantes 
        WHERE nombre LIKE ? OR apellido LIKE ? OR cedula LIKE ? OR email LIKE ?
    `;

    db.query(query, [searchTerm, searchTerm, searchTerm, searchTerm], (err, results) => {
        if (err) {
            console.error('❌ Error en búsqueda:', err);
            res.status(500).json({ 
                success: false, 
                error: err.message 
            });
            return;
        }
        console.log(`✅ Encontrados ${results.length} resultados`);
        res.json({ 
            success: true, 
            data: results 
        });
    });
});

// 7. OBTENER ESTADÍSTICAS DE ESTUDIANTES
app.get('/api/estudiantes/estadisticas/resumen', (req, res) => {
    console.log('📥 GET /api/estudiantes/estadisticas/resumen');
    
    const queries = {
        total: 'SELECT COUNT(*) as total FROM estudiantes',
        activos: 'SELECT COUNT(*) as activos FROM estudiantes WHERE estado = "activo"',
        porCarrera: 'SELECT carrera, COUNT(*) as cantidad FROM estudiantes GROUP BY carrera',
        porEstado: 'SELECT estado, COUNT(*) as cantidad FROM estudiantes GROUP BY estado',
        porSemestre: 'SELECT semestre, COUNT(*) as cantidad FROM estudiantes GROUP BY semestre'
    };

    db.query(queries.total, (err, total) => {
        if (err) {
            res.status(500).json({ success: false, error: err.message });
            return;
        }
        db.query(queries.activos, (err, activos) => {
            if (err) {
                res.status(500).json({ success: false, error: err.message });
                return;
            }
            db.query(queries.porCarrera, (err, porCarrera) => {
                if (err) {
                    res.status(500).json({ success: false, error: err.message });
                    return;
                }
                db.query(queries.porEstado, (err, porEstado) => {
                    if (err) {
                        res.status(500).json({ success: false, error: err.message });
                        return;
                    }
                    db.query(queries.porSemestre, (err, porSemestre) => {
                        if (err) {
                            res.status(500).json({ success: false, error: err.message });
                            return;
                        }
                        res.json({
                            success: true,
                            data: {
                                total: total[0].total,
                                activos: activos[0].activos,
                                porCarrera,
                                porEstado,
                                porSemestre
                            }
                        });
                    });
                });
            });
        });
    });
});

// ============================================
// 🏠 ENDPOINT DE PRUEBA
// ============================================

app.get('/api/test', (req, res) => {
    res.json({ 
        message: '✅ API funcionando correctamente',
        endpoints: {
            usuarios: {
                get: '/api/usuarios',
                post: '/api/usuarios'
            },
            estudiantes: {
                getAll: '/api/estudiantes',
                getById: '/api/estudiantes/:id',
                create: '/api/estudiantes',
                update: '/api/estudiantes/:id',
                delete: '/api/estudiantes/:id',
                search: '/api/estudiantes/buscar/:termino',
                stats: '/api/estudiantes/estadisticas/resumen'
            }
        }
    });
});

// ============================================
// 🚀 INICIAR SERVIDOR
// ============================================

app.listen(3000, () => {
    console.log('\n🚀 SERVICIO BACKEND INICIADO');
    console.log('   http://localhost:3000');
    console.log('\n📋 ENDPOINTS DISPONIBLES:');
    console.log('\n📚 USUARIOS:');
    console.log('   GET  http://localhost:3000/api/usuarios');
    console.log('   POST http://localhost:3000/api/usuarios');
    console.log('\n🎓 ESTUDIANTES:');
    console.log('   GET    http://localhost:3000/api/estudiantes');
    console.log('   GET    http://localhost:3000/api/estudiantes/:id');
    console.log('   POST   http://localhost:3000/api/estudiantes');
    console.log('   PUT    http://localhost:3000/api/estudiantes/:id');
    console.log('   DELETE http://localhost:3000/api/estudiantes/:id');
    console.log('   GET    http://localhost:3000/api/estudiantes/buscar/:termino');
    console.log('   GET    http://localhost:3000/api/estudiantes/estadisticas/resumen');
    console.log('\n🔧 TEST:');
    console.log('   GET http://localhost:3000/api/test');
    console.log('\n✅ Servidor listo para peticiones...\n');
});


/*const express = require('express');
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

*/