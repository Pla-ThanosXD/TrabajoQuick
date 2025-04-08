//Manejar el formulario de registro de trabajador
document.getElementById('registro-form-trabajador').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const telefono = document.getElementById('telefono').value;
    const servicio = document.getElementById('servicio').value;
    const ubicacion = document.getElementById('ubicacion').value;

    fetch('/register-trabajador', {
        method: 'POST',
        body: JSON.stringify({ nombre, correo, contrasena, telefono, servicio, ubicacion }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            window.location.href = "/html/loginTrabajador.html";  // Redirige a la página de login            // Redirige al login después del registro exitoso
        } else {
            alert(data.error || 'Hubo un error al registrar.');
        }
    })
    .catch(error => console.error('Error:', error));
});

// Manejar el formulario de inicio de sesión de trabajador
document.getElementById('login-form-trabajador').addEventListener('submit', function(event) {
    event.preventDefault();

    const correoInicio = document.getElementById('correoInicio').value;
    const contrasenaInicio = document.getElementById('contraseñaInicio').value;

    fetch('/login-trabajador', {
        method: 'POST',
        body: JSON.stringify({ correo: correoInicio, contrasena: contrasenaInicio }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            // Guardar los datos del trabajador en localStorage
            localStorage.setItem('trabajador', JSON.stringify(data.trabajador));
    
            // Redirigir al dashboard correspondiente
            window.location.href = data.dashboard;  // Redirige al dashboard correspondiente
        } else {
            alert(data.error || 'Credenciales incorrectas.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error en la solicitud.');
    });
});

// Manejar la actualización del perfil
ddocument.addEventListener('DOMContentLoaded', function() {
    // Obtén los datos del trabajador desde localStorage
    const trabajador = JSON.parse(localStorage.getItem('trabajador'));

    if (trabajador) {
        // Rellenar los campos con los datos del trabajador
        document.getElementById('nombre').value = trabajador.nombre;
        document.getElementById('correo').value = trabajador.correo;
        document.getElementById('telefono').value = trabajador.telefono;
        document.getElementById('servicio').value = trabajador.servicio;
        document.getElementById('ubicacion').value = trabajador.ubicacion;
    }

    // Manejar el formulario de actualización
    document.getElementById('update-profile-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;
        const servicio = document.getElementById('servicio').value;
        const ubicacion = document.getElementById('ubicacion').value;

        fetch('/update-worker-profile', {
            method: 'PUT',
            body: JSON.stringify({ email: correo, nombre, telefono, servicio, ubicacion }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Perfil actualizado con éxito');
                // Actualizar la interfaz con los nuevos datos
                localStorage.setItem('trabajador', JSON.stringify({ ...trabajador, nombre, telefono, servicio, ubicacion }));
            } else {
                alert(data.error || 'Error al actualizar perfil.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al actualizar la información.');
        });
    });


// Manejar la eliminación de perfil (cuando el trabajador hace clic en "Eliminar")
document.querySelector('.btn-delete').addEventListener('click', function() {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar tu perfil?');
    if (confirmDelete) {
        const email = 'pele123@gmail.com';  // El correo electrónico del trabajador (esto debe ser dinámico)

        // Realizar la solicitud al backend para eliminar el perfil
        fetch('/delete-worker-profile', {
            method: 'DELETE',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                window.location.href = '/login';  // Redirigir al login después de eliminar el perfil
            } else {
                alert(data.error || 'Error al eliminar perfil.');
            }
        })
        .catch(error => console.error('Error:', error));
    }
});

// Redirigir al Dashboard Principal (cuando el trabajador hace clic en "Ir al Dashboard")
document.querySelector('.btn-dashboard').addEventListener('click', function() {
    window.location.href = '/dashboard.html';  // Asegúrate de tener esta página creada
});
})
