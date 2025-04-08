document.addEventListener("DOMContentLoaded", function () {
    const menuContainer = document.querySelector(".menu-container");
    const profilePic = document.getElementById("profilePic");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const btnRegister = document.querySelector(".btn-register");

    // Verificar si el usuario está autenticado
    const userLoggedIn = localStorage.getItem("user");

    if (userLoggedIn) {
        // Ocultar el botón de registro
        if (btnRegister) btnRegister.style.display = "none";

        // Aquí ya no necesitamos crear el menú, solo asegurarnos de que existe
        // Mostrar el menú al hacer clic en la imagen del perfil
        profilePic.addEventListener("click", function () {
            console.log("Imagen de perfil clickeada");
            dropdownMenu.classList.toggle("show");
        });

        // Evento para cerrar sesión
        document.getElementById("logout").addEventListener("click", function () {
            localStorage.removeItem("user");
            location.reload(); // Recarga la página para reflejar los cambios
        });
    }
});
