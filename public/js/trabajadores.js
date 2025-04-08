function mostrarTrabajadores() {
    fetch('http://localhost:3001/trabajadores') // Asegúrate de que la URL sea correcta
        .then(response => response.json())
        .then(data => {
            const workersContainer = document.getElementById('workers-container');
            
            // Verifica si hay trabajadores
            if (data && data.length > 0) {
                data.forEach(trabajador => {
                    const workerCard = document.createElement('div');
                    workerCard.classList.add('worker-card');
                    workerCard.innerHTML = `
                        <h3>${trabajador.nombre}</h3>
                        <p><strong>Correo:</strong> ${trabajador.correo}</p>
                        <p><strong>Teléfono:</strong> ${trabajador.telefono}</p>
                        <p><strong>Ubicación:</strong> ${trabajador.ubicacion}</p>
                        <p><strong>Servicio:</strong> ${trabajador.servicio}</p>
                    `;

                    // Agregar cada tarjeta al contenedor
                    workersContainer.appendChild(workerCard);
                });
            } else {
                workersContainer.innerHTML = "<p>No se encontraron trabajadores.</p>";
            }
        })
        .catch(error => {
            console.error('Error al obtener los trabajadores:', error);
        });
}

// Llamar a la función para mostrar los trabajadores cuando la página cargue
document.addEventListener('DOMContentLoaded', mostrarTrabajadores);
