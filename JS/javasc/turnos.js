// Función para registrar al paciente
function registrarPaciente() {
    // Obtener los valores de los campos del formulario
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var fechaNacimiento = document.getElementById("fechaNacimiento").value;
    var terapia = document.getElementById("sesion").value;

    // Crear un objeto con la información del paciente
    const paciente = {
        nombre: nombre,
        email: email,
        fechaNacimiento: fechaNacimiento,
        terapia: terapia
    };

    // Convertir el objeto en una cadena JSON
    const pacienteJSON = JSON.stringify(paciente);

    // Guardar la cadena JSON en el localStorage
    localStorage.setItem("paciente", pacienteJSON);

    // Mostrar el modal de confirmación
    mostrarModal('Paciente registrado exitosamente.');
    
    // Ocultar el formulario después de guardar la información
    const formulario = document.getElementById('formularioRegistro'); 
    formulario.style.display = 'none';

}



function compararNombre() {
    // Obtener el nombre ingresado por el usuario
    const nombreIngresado = document.getElementById('nombrePaciente').value;

    // Obtener el nombre registrado en el localStorage
    const pacienteJSON = localStorage.getItem("paciente");

    
    const selectHorario = document.getElementById('horario');
    selectHorario.addEventListener('change', function() {
        actualizarTurnoSeleccionado();
    });

    if (pacienteJSON) {
        // Parsear el objeto JSON almacenado
        const paciente = JSON.parse(pacienteJSON);

        // Comparar el nombre ingresado con el nombre registrado
        if (nombreIngresado === paciente.nombre) {
            const mensaje = `¡Bienvenido de nuevo, ${nombreIngresado}!`;
            mostrarModal(mensaje);

            // Lógica para obtener el turno seleccionado (debes implementar esta parte)
            const diaSeleccionado = document.getElementById('dia').value;
            const horarioSeleccionado = selectHorario.options[selectHorario.selectedIndex].text;
            const turnoSeleccionado = `Día: ${diaSeleccionado}, Horario: ${horarioSeleccionado}`;
            mostrarTurnoSeleccionado(turnoSeleccionado);
        } else {
            const mensaje = `El nombre ${nombreIngresado} no coincide con el nombre registrado.`;
            mostrarModalError(mensaje);
        }
    } else {
        const mensaje = `No hay un paciente registrado. Por favor, regístrese.`;
        mostrarModalError(mensaje);
    }
}

function mostrarModal(mensaje) {
    const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');
    mensajeConfirmacion.textContent = mensaje;
    const modal = new bootstrap.Modal(document.getElementById('confirmacionModal'));
    modal.show();
}

function mostrarModalError(mensaje) {
    const mensajeError = document.getElementById('mensajeError');
    mensajeError.textContent = mensaje;
    const modal = new bootstrap.Modal(document.getElementById('errorModal'));
    modal.show();
}

function mostrarTurnoSeleccionado(turno) {
    const mensajeTurno = document.getElementById('mensajeTurno');
    mensajeTurno.textContent = turno;
    const modal = new bootstrap.Modal(document.getElementById('turnoModal'));
    modal.show();
}


// Evento click del botón "Reservar"
document.getElementById('reservarBtn').addEventListener('click', function () {
    compararNombre();
});







//mostrar formulario cuando selecciona NO
// Obtiene el radio y el formulario
const checkNo = document.getElementById('flexRadioDefault2');
const checkSi = document.getElementById('flexRadioDefault1');
const formulario = document.getElementById('formularioRegistro');
const divPage = document.getElementById('divPage');



// Agrega un evento para mostrar/ocultar el formulario y ajustar la altura de la página
checkNo.addEventListener('change', function() {
if (checkNo.checked) {
    formulario.style.display = 'block'; // Muestra el formulario
     // Ajusta la altura de page automáticamente
} else {
    formulario.style.display = 'none'; // Oculta el formulario
    // vuelve la altura de page al 100%
}
});
//desaparece el formulario al apretar Si
checkSi.addEventListener('change', function() {
    if (checkSi.checked) {
        formulario.style.display = 'none';
    }
});