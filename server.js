const express = require("express");
const bcrypt = require('bcrypt');
const app = express();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const db = require('./database');
const path = require('path');
const cors = require('cors');


app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());
app.use(express.json());


// Rutas para USUARIOS
// Ruta para registrar usuario con validación
app.post(
  "/register",
  [
    check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
    check('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
    check('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }

    const { nombre, email, contrasena } = req.body;

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const query = "INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)";
    db.query(query, [nombre, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error al registrar usuario:", err);
        return res.status(500).json({ error: "Error al registrar usuario" });
      }
      res.status(201).json({ message: "Usuario registrado correctamente" });
    });
  }
);


// Ruta para iniciar sesión de USUARIOS
app.post("/login", async (req, res) => {
  const { email, contrasena } = req.body;
  const query = "SELECT * FROM usuarios WHERE email = ?";

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Error en el servidor:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (results.length > 0) {
      const user = results[0];

      const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);

      if (passwordMatch) {
        res.json({
          message: "Inicio de sesión exitoso",
          user: {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
          },
        });
      } else {
        res.status(401).json({ error: "Credenciales incorrectas" });
      }
    } else {
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  });
});

// Ruta para registrar trabajador con validación
// Ruta para registrar trabajador con validación
app.post(
  "/register-trabajador",
  [
    check("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    check("correo").isEmail().withMessage("El correo debe ser válido"),
    check("contrasena").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    check("telefono").notEmpty().withMessage("El teléfono es obligatorio"),
    check("servicio").notEmpty().withMessage("El tipo de servicio es obligatorio"),
    check("ubicacion").notEmpty().withMessage("La ubicación es obligatoria"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { nombre, correo, contrasena, telefono, servicio, ubicacion } = req.body;

    try {
      // Hashear la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(contrasena, 10);

      const query = "INSERT INTO trabajadores (nombre, correo, contrasena, telefono, servicio, ubicacion, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, NOW())";

      db.query(query, [nombre, correo, hashedPassword, telefono, servicio, ubicacion], (err, result) => {
        if (err) {
          console.error("Error al registrar trabajador:", err);
          return res.status(500).json({ error: "Error al registrar trabajador" });
        }
        res.status(201).json({ message: "Trabajador registrado correctamente" });
      });
    } catch (error) {
      console.error("Error al hashear la contraseña:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
);

// Ruta para iniciar sesión de trabajadores
app.post("/login-trabajador", async (req, res) => {
  const { correo, contrasena } = req.body;
  const query = "SELECT * FROM trabajadores WHERE correo = ?";

  db.query(query, [correo], async (err, results) => {
      if (err) {
          console.error("Error en el servidor:", err);
          return res.status(500).json({ error: "Error en el servidor" });
      }

      if (results.length > 0) {
          const trabajador = results[0];

          // Comparar la contraseña proporcionada con la almacenada (hasheada) en la base de datos
          const passwordMatch = await bcrypt.compare(contrasena, trabajador.contrasena);

          if (passwordMatch) {
              // Determinar el dashboard correspondiente basado en el servicio del trabajador
              let dashboardUrl = '/dashboardGenerico.html';  // URL por defecto
              
              if (trabajador.servicio === 'Pintor') {
                  dashboardUrl = '/html/dashboardPintor.html';
              } else if (trabajador.servicio === 'Fontanero') {
                  dashboardUrl = '/html/dashboardFontanero.html';
              } else if (trabajador.servicio === 'Electricista') {
                  dashboardUrl = '/html/dashboardElectricista.html';
              } else if (trabajador.servicio === 'Electrodomésticos') {
                  dashboardUrl = '/html/dashboardElectrodomesticos.html';
              } else { (trabajador.servicio === 'mecanico, cerrajero, jardinero, limpieza, profesor privado'); {
                  dashboardUrl = '/html/dashboardGenerico.html';
              }
            }
          
              // Responder con el mensaje y los datos del trabajador
              res.json({
                  message: "Inicio de sesión exitoso",
                  trabajador: {
                      id: trabajador.id,
                      nombre: trabajador.nombre,
                      correo: trabajador.correo,
                      telefono: trabajador.telefono,
                      servicio: trabajador.servicio,
                      ubicacion: trabajador.ubicacion
                  },
                  dashboard: dashboardUrl // Incluir la URL del dashboard
              });
          } else {
              res.status(401).json({ error: "Credenciales incorrectas" });
          }
      } else {
          res.status(401).json({ error: "Credenciales incorrectas" });
      }
  });

});
app.get('/trabajadores', (req, res) => {
  const query = "SELECT * FROM trabajadores"; // Consulta para obtener todos los trabajadores
  db.query(query, (err, results) => {
      if (err) {
          console.error("Error al obtener los trabajadores:", err);
          return res.status(500).json({ error: "Error al obtener los trabajadores" });
      }

      // Enviar los datos de los trabajadores como JSON
      res.json(results);  // Aquí enviamos los datos como JSON
  });
});
// Ruta para recibir la notificación
app.post('/notificar', (req, res) => {
  const { trabajadorId, mensaje } = req.body;  // Recibe el ID del trabajador y el mensaje

  // Simulación: aquí podríamos guardar la notificación en una base de datos o memoria
  console.log(`Notificación para el trabajador ${trabajadorId}: ${mensaje}`);

  // Responder al cliente con un mensaje de éxito
  res.status(200).json({ message: `Notificación enviada al trabajador ${trabajadorId}` });
});
 
// Ruta para obtener las notificaciones de un trabajador
app.get('/notificaciones/:trabajadorId', (req, res) => {
  const trabajadorId = req.params.trabajadorId;

  
  const notificaciones = [
      { mensaje: '¡Has sido contratado! Un usuario te ha elegido para su proyecto.' }
  ];

  res.json(notificaciones);  // Devolver las notificaciones en formato JSON
});
// Ruta para actualizar la información del trabajador
app.put('/update-worker-profile', (req, res) => {
  const { email, nombre, telefono, servicio, ubicacion } = req.body;

  if (!email || !nombre || !telefono || !servicio || !ubicacion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  const query = "UPDATE trabajadores SET nombre = ?, telefono = ?, servicio = ?, ubicacion = ? WHERE correo = ?";
  db.query(query, [nombre, telefono, servicio, ubicacion, email], (err, result) => {
    if (err) {
      console.error("Error al actualizar perfil:", err);
      return res.status(500).json({ error: "Hubo un error al actualizar el perfil." });
    }

    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Perfil actualizado exitosamente." });
    } else {
      res.status(404).json({ error: "No se encontró el trabajador para actualizar." });
    }
  });
});
// Ruta para eliminar el perfil de un trabajador
app.delete('/delete-worker-profile', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Se debe proporcionar el correo electrónico." });
  }

  const query = "DELETE FROM trabajadores WHERE correo = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Error al eliminar perfil:", err);
      return res.status(500).json({ error: "Hubo un error al eliminar el perfil." });
    }

    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Perfil eliminado exitosamente." });
    } else {
      res.status(404).json({ error: "No se encontró el trabajador." });
    }
  });
});





// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


