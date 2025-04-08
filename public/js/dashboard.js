window.onload = function() {
    // Obtener los datos del trabajador desde localStorage
    const trabajador = JSON.parse(localStorage.getItem('trabajador'));

    // Verificar si el trabajador existe
    if (trabajador) {
        // Llenar los elementos HTML con los datos del trabajador
        document.getElementById('nombreTrabajador').textContent = trabajador.nombre;
        document.getElementById('correoTrabajador').textContent = trabajador.correo;
        document.getElementById('telefonoTrabajador').textContent = trabajador.telefono;
        document.getElementById('ubicacionTrabajador').textContent = trabajador.ubicacion;
        document.getElementById('servicioTrabajador').textContent = trabajador.servicio;  // Agregar el servicio
    } else {
        // Si no hay datos del trabajador, mostrar un mensaje de error
        alert('No se encontró la información del trabajador.');
    }
};