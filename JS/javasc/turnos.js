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

function mostrarModal(mensaje) {
    const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');
    mensajeConfirmacion.textContent = mensaje;
    const modal = new bootstrap.Modal(document.getElementById('confirmacionModal'));
    modal.show();
}


// Evento click del botón "Reservar"
document.getElementById('reservarBtn').addEventListener('click', function () {
    const nombrePaciente = document.getElementById('nombre').value;
    const dia = document.getElementById('dia').value;
    const horario = document.getElementById('horario').value;
    
    if (verificarRegistro(nombrePaciente)) {
        const mensaje = `¡Turno confirmado para ${nombrePaciente} el día ${dia} a las ${horario}!`;
        document.getElementById('confirmacionTexto').textContent = mensaje;
        mostrarModalConfirmacion();
    } else {
        const mensaje = `El nombre ${nombrePaciente} no está registrado. Por favor, regístrese.`;
        document.getElementById('advertenciaTexto').textContent = mensaje;
        mostrarModalAdvertencia();
    }
});



//CODIGO COMENTADO XQ NO ESTA TERMINADO
// class ControladorPacientes {
//     constructor() {
//         this.pacientes = [];
//         this.turnosOcupados = {};
//     }
//     agregarPaciente(paciente) {
//         this.pacientes.push(paciente);
//     }
//     buscarPaciente(nombre) {
//         return this.pacientes.find(paciente => paciente.nombreCompleto.toLowerCase() === nombre.toLowerCase());

//     }
//     pasarNombreMayuscula(paciente){
//         return {
//             ...paciente,
//             nombreCompleto: paciente.nombreCompleto.toUpperCase()
//         }
//     }
//     filtrarPacientesPorSesion(sesion) {
//         return this.pacientes.filter(paciente => paciente.sesion.toLowerCase() === sesion.toLowerCase());
//     }

//     //para calcular años del paciente, aun trabajando en esta funcion
//     calcularEdad(fechaNacimiento){
//         const ahora = new Date();
//         const nacimiento = new Date(fechaNacimiento);
//         let edad = ahora.getFullYear() - nacimiento.getFullYear();
        
//         if (ahora.getMonth() < nacimiento.getMonth() || (ahora.getMonth() === nacimiento.getMonth() && ahora.getDate() < nacimiento.getDate()  )) {
//             edad--; //para completar la edad si aun no cumplio años
//         }
//         return edad; 
//     }



//manipulación de datos internos
//funcion para que el usuario pueda cambiar info
function modificarDatosPacientes(paciente){
    console.log("Datos actuales del paciente: "); 
    for (const propiedad in paciente) {
        console.log(`${propiedad}: ${paciente[propiedad]}`);
    }
    const actualizar = prompt("Desea actualizar sus datos? (si/no)").toLowerCase();
    if (actualizar === "si") {
        const nuevaFechaNacimiento = new Date(prompt("Nueva fecha de nacimiento: "));
        paciente.fechaNacimiento = nuevaFechaNacimiento;

        console.log("Datos actualizados:");
        for (const propiedad in paciente) {
            console.log(`${propiedad}: ${paciente[propiedad]}`);
        }
    }
}

function cancelarTurno(paciente){
    const confirmacion = prompt("¿Está seguro de que desea cancelar su turno? (si/no)").toLowerCase();
    if (confirmacion === "si") {
        // Código para eliminar el turno
        console.log("Su turno ha sido cancelado.");
    }
}


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




