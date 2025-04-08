document.querySelector("#login-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita que la página se recargue
  
    // Obtiene los valores del formulario
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
  
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, contrasena: password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
            // Guardar los datos del usuario en localStorage
            localStorage.setItem("user", JSON.stringify(data.user));
  
            // Redirigir al dashboard
            window.location.href = "/html/dashboard.html"; // Asegúrate de que la ruta sea correcta
        } else {
            alert(data.error); // Mostrar error si las credenciales son incorrectas
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Hubo un error en el servidor. Intenta nuevamente.");
    }
  });
  document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar el envío por defecto del formulario

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email-registro').value;
    const contrasena = document.getElementById('password-registro').value;

    fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombre,
            email: email,
            contrasena: contrasena,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('Usuario registrado con éxito!');
            window.location.href = 'loginUsuario.html'; // Aquí redirigimos a la página de login
        } else {
            alert('Error al registrar usuario: ' + data.error);
        }
    })
    .catch(error => console.error('Error:', error));
});
  
  const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
 