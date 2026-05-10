/* ========================================
   SCRIPT DE GESTIÓN DE USUARIOS
   Comentarios generados por IA
   Este archivo fue mejorado con ayuda de IA para corregir errores
   y hacer la lógica más clara y funcional.
   ======================================== */

// Lista de usuarios en memoria para la aplicación.
let usuarios = [];

// Valida que todos los campos del formulario estén completos y sean válidos.
function validarFormulario(Nombre, Apellido, Correo, rol, Edad) {
    if (!Nombre || !Apellido || !Edad || !Correo || !rol) {
        alert("Por favor, complete todos los campos.");
        return false;
    }

    if (isNaN(Edad) || Edad <= 0) {
        alert("Por favor, ingrese una edad válida.");
        return false;
    }

    return true;
}

// Agrega un usuario nuevo a la lista cuando se envía el formulario.
function agregarUsuario(event) {
    event.preventDefault();

    const Nombre = document.getElementById("Nombre").value.trim();
    const Apellido = document.getElementById("Apellido").value.trim();
    const Correo = document.getElementById("email").value.trim();
    const rol = document.getElementById("rol").value;
    const Edad = parseInt(document.getElementById("Edad").value.trim(), 10);

    if (!validarFormulario(Nombre, Apellido, Correo, rol, Edad)) {
        return;
    }

    const nuevoUsuario = {
        Nombre,
        Apellido,
        Correo,
        rol,
        Edad,
        activo: true
    };

    usuarios.push(nuevoUsuario);
    ordenarPorEdad();
    mostrarUsuarios();
    document.getElementById("formUsuario").reset();
}

// Muestra los usuarios en la tabla, aplicando filtros si existen.
function mostrarUsuarios() {
    const filtroRol = document.getElementById("filtro-rol").value;
    const filtroEstado = document.getElementById("filtro-estado").value;
    const tabla = document.getElementById("tablaUsuarios");

    tabla.innerHTML = "";

    let filtrados = usuarios.filter(usuario => {
        const cumpleRol = !filtroRol || filtroRol === usuario.rol;
        const cumpleEstado = !filtroEstado || (filtroEstado === "Activo" ? usuario.activo : !usuario.activo);
        return cumpleRol && cumpleEstado;
    });

    filtrados.forEach((usuario, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${usuario.Nombre}</td>
            <td>${usuario.Apellido}</td>
            <td>${usuario.Edad}</td>
            <td>${usuario.Correo}</td>
            <td>${usuario.rol}</td>
            <td>${usuario.activo ? "Activo" : "Inactivo"}</td>
            <td>
                <button class="btn btn-sm btn-warning me-2" onclick="cambiarEstado(${index})">🔄 Estado</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${index})">🗑️ Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });

    actualizarContadores();
}

// Cambia el estado activo/inactivo de un usuario.
function cambiarEstado(index) {
    if (usuarios[index]) {
        usuarios[index].activo = !usuarios[index].activo;
        mostrarUsuarios();
    }
}

// Elimina un usuario de la lista después de la confirmación.
function eliminarUsuario(index) {
    if (!usuarios[index]) {
        return;
    }

    const usuario = usuarios[index];
    const confirmado = confirm(`¿Está seguro de eliminar a ${usuario.Nombre} ${usuario.Apellido}?`);

    if (confirmado) {
        usuarios.splice(index, 1);
        mostrarUsuarios();
    }
}

// Ordena los usuarios por edad antes de mostrarlos.
function ordenarPorEdad() {
    usuarios.sort((a, b) => a.Edad - b.Edad);
}

// Actualiza los contadores de usuarios activos e inactivos.
function actualizarContadores() {
    const activos = usuarios.filter(u => u.activo).length;
    const inactivos = usuarios.length - activos;

    document.getElementById("contador-activos").textContent = `✅ Usuarios Activos: ${activos}`;
    document.getElementById("contador-inactivos").textContent = `❌ Usuarios Inactivos: ${inactivos}`;
}

// Inicialización del evento submit y filtros.
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("formUsuario").addEventListener("submit", agregarUsuario);
    document.getElementById("filtro-rol").addEventListener("change", mostrarUsuarios);
    document.getElementById("filtro-estado").addEventListener("change", mostrarUsuarios);
    mostrarUsuarios();
});

