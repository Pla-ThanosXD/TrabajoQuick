// Función para mostrar las notificaciones del trabajador
function mostrarNotificaciones(trabajadorId) {
    fetch(`/notificaciones/${trabajadorId}`)  // Solicitar las notificaciones al servidor
        .then(response => response.json())  // Convertir la respuesta a JSON
        .then(data => {
            const notificacionesContainer = document.getElementById('notificaciones-container');
            
            // Verifica si hay notificaciones
            if (data && data.length > 0) {
                data.forEach(notificacion => {
                    const notifDiv = document.createElement('div');
                    notifDiv.classList.add('notificacion');
                    notifDiv.innerHTML = `<p>${notificacion.mensaje}</p>`;  // Mostrar el mensaje de la notificación

                    // Añadir la notificación al contenedor
                    notificacionesContainer.appendChild(notifDiv);
                });
            } else {
                notificacionesContainer.innerHTML = "<p>No tienes notificaciones nuevas.</p>";
            }
        })
        .catch(error => {
            console.error('Error al cargar las notificaciones:', error);  // Si hay un error
        });
}

// Llamar a la función cuando la página se haya cargado completamente
document.addEventListener('DOMContentLoaded', () => {
    mostrarNotificaciones(1);  // Aquí puedes pasar el ID del trabajador desde la sesión o almacenamiento local
});
