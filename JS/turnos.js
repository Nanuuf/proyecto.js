// Función para registrar al paciente
function registrarPaciente() {
    // Obtener los valores de los campos del formulario
    // desestructur de los valores del formulario
    const { value: nombreval } = document.getElementById("nombre");
    const nombre = nombreval.toLowerCase();
    const { value: email } = document.getElementById("email");
    const { value: fechaNacimiento } = document.getElementById("fechaNacimiento");
    const { value: terapia } = document.getElementById("sesion");
    //valida el nombre
    const nombreValido = nombre.length >=5 && /^[a-zA-Z ]+$/.test(nombre);
    // Validar el correo electrónico
    const emailValido = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
    // Validar la fecha de nacimiento
    const fechaNacimientoValida = /^\d{4}\/\d{2}\/\d{2}$/.test(fechaNacimiento);
    
    //validaciones 
    const errores= [
        !nombre ? "Por favor, ingrese su nombre" : null,
        !email ? "Por favor, ingrese su mail " : null,
        !fechaNacimiento ? "Por favor, ingrese su fecha de nacimiento" : null,
        terapia === "selecciona la terapia" ? "Por favor, seleccione una terapia" : null,
        !nombreValido ? "Por favor, ingrese un nombre válido con al menos 5 caracteres y solo letras." : null,
        !emailValido ? "Por favor, ingrese un correo electrónico válido." : null,
        !fechaNacimientoValida ? "Por favor, ingrese una fecha de nacimiento válida en el formato AAAA/MM/DD." : null,
        
    ].filter(error => error != null)
    // Si hay errores, mostrarlos en un mensaje de error
    if (errores.length > 0 ){
        const mensajeError = "Por favor, corrija los siguientes errores:\n" + errores.join("\n");
    Swal.fire({
        icon: 'error',
        text: mensajeError
    })
    return; 
    }

    if (!nombre || !email || !fechaNacimiento || !terapia === "selecciona la terapia") {
        Swal.fire({
            icon: 'error',
            text: 'Por favor, complete todos los campos.'
        });
        return;
    }
    //Si no hay errores continua con el registro
    const paciente = {
        nombre,
        email,
        fechaNacimiento,
        terapia
    };
    //uso localstorage aca porque no puedo hacer PUT y guardar al nuevo paciente en pacientes.json
    // Converti el objeto en una cadena JSON
    const pacienteJSON = JSON.stringify(paciente);

    // Guarda la cadena JSON en el localStorage
    localStorage.setItem("paciente", pacienteJSON);

    // s.a de confirmacion
    Swal.fire('Paciente registrado exitosamente.');

    // foreach para desmarcar lo de verificación
    ['flexRadioDefault1', 'flexRadioDefault2'].forEach(id => {
        document.getElementById(id).checked = false;
    });
    // Ocultar el formulario después de guardar la información
    const formulario = document.getElementById('formularioRegistro'); 
    formulario.style.display = 'none';

}



document.getElementById('ComprNombre').addEventListener('click', function(){
    try {
        compararNombre();
    } catch (error) {
        console.error('Error en compararNombre:', error);
        Swal.fire({
            icon: 'error',
            text: 'Ocurrió un error al comparar el nombre.'
        });
    }
});

function compararNombre() {
    // Obtengo el nombre ingresado por el usuario
    const nombreIngresado = document.getElementById('nombrePaciente').value.toLowerCase();
    
    if (nombreIngresado.length < 5 ){
        swal.fire({
            icon:'error',
            text: 'Ingrese un nombre valido, al menos 5 caracteres'
        })
    }

    

    // Obtengo el nombre registrado en el localStorage
    const pacientelS = localStorage.getItem("paciente");
    // parsea el objeto JSON almacenado
    const paciente = JSON.parse(pacientelS);
    //uso localstorage tmb para comparar
    fetch('../JSON/pacientes.json')
    .then(response => response.json())
    .then(data => {
        // Busqueda el paciente en los pacientes ya cargados
        const pacienteJSON = data.find(p => p.nombre === nombreIngresado);
        //no uso ternario x ser un if grande (se podria hacer pero me quedaba mejor p/ entenderlo yo)
        if (pacienteJSON || nombreIngresado === paciente.nombre ) {
            console.log(nombreIngresado);
            Swal.fire(`¡Bienvenido de nuevo, ${nombreIngresado}!`)
            document.getElementById('reservarBtn').disabled = false;
            document.getElementById('flexRadioDefault1').checked = false;
        }else {
            Swal.fire({
                icon: 'error',
                text:`El nombre ${nombreIngresado} no coincide con un nombre registrado.`
                
            })
            document.getElementById('reservarBtn').disabled = true;
        }
    })
    .catch(error => {
        console.error('Error al cargar el archivo pacientes.json ', error)
        Swal.fire({
            icon: 'error',
            text:'ocurrio un error al cargar la informacion'
        })
    })
}

document.getElementById('reservarBtn').addEventListener('click', function(){
    ReservaTrn()
})

function ReservaTrn() {
    try {
        const selectHorario = document.getElementById('horario');
        //para que me tome el horario bien
        selectHorario.addEventListener('change', function() {
            const valorSeleccionado = selectHorario.options[selectHorario.selectedIndex].text;
        });
        // obtiene el turno seleccionado 
        const diaSeleccionado = document.getElementById('dia').value;
        const horarioSeleccionado = selectHorario.options[selectHorario.selectedIndex].text;
        
        const erroresTurno = [
            diaSeleccionado === "selecciona el dia" ? "Por favor, seleccione un dia" : null,
            horarioSeleccionado === "selecciona el horario" ? "Por favor, seleccione un horario" : null
        ].filter(error => error != null)
        // Si hay errores, los muestra en un mensaje de error
        if (erroresTurno.length > 0 ){
            const mensajeError = "Por favor, corrija los siguientes errores:\n" + erroresTurno.join("\n");
        Swal.fire({
            icon: 'error',
            text: mensajeError
        })
        return; 
        }

        Swal.fire({
            icon: 'success',
            title: 'Turno reservado con exito!',
            text: `Dia: ${diaSeleccionado}, Horario: ${horarioSeleccionado}`  ,
            showConfirmButton: false,
            timer: 2500
        })
        document.getElementById('dia').selectedIndex = 0;
        document.getElementById('horario').selectedIndex = 0;

    } catch (error) {
        console.error('Error en ReservaTrn:', error);
        Swal.fire({
            icon: 'error',
            text: 'Ocurrió un error al reservar el turno.'
        });
    }
}


//p/ mostrar formulario cuando selecciona NO
// obtiene:  el radio y el formulario
const checkNo = document.getElementById('flexRadioDefault2');
const checkSi = document.getElementById('flexRadioDefault1');
const formulario = document.getElementById('formularioRegistro');
const divPage = document.getElementById('divPage');



// Agrega un evento para mostrar/ocultar el formulario y ajustar la altura de la página
checkNo.addEventListener('change', function() {
    formulario.style.display = checkNo.checked ? 'block' : 'none';
    // block: Muestra el formulario
    // none:  Oculta el formulario
});
//desaparece el formulario al apretar Si
checkSi.addEventListener('change', function() {
    checkSi.checked ? formulario.style.display = 'none' : null;
});


// Evento del botón "Actualizar Información"
document.getElementById('actualizarBtn').addEventListener('click', function () {
    cargarInformacion(); // Carga la información actual en el formulario de actualización
    // Muestra el formulario de actualización
    document.getElementById('formularioActualizar').style.display = 'block';
    document.getElementById('formularioMostrar').style.display = 'none';
});

// Función para cargar la información del paciente en el formulario de actualización
//el paciente puede aactualizar su informacion

function cargarInformacion() {
    // Obtenego el nombre ingresado por el usuario: nombreIngresado
    const nombreIngresado = document.getElementById('nombrePaciente').value.toLowerCase();
    // Obtiene el nombre registrado en el localStorage
    const pacientelS = localStorage.getItem("paciente");
    // Parsea el objeto JSON almacenado
    const paciente = JSON.parse(pacientelS);
    //uso localstorage tmb para comparar
    fetch('../JSON/pacientes.json')
    .then(response => response.json())
    .then(data => {
        // Buscar el paciente en los pacientes ya cargados
        const pacienteJSON = data.find(p => p.nombre === nombreIngresado);
        if (pacienteJSON ) {
            llenarCampos(pacienteJSON)
            document.getElementById('eliminarDatosBtn').disabled = false;
        } else if ( nombreIngresado === paciente.nombre) {
            llenarCampos(paciente)
            document.getElementById('eliminarDatosBtn').disabled = false;
        } else {
            Swal.fire({
                icon: 'error',
                text:`El nombre ${nombreIngresado} no coincide con un nombre registrado.`
            })
        }
    })
    .catch(error => {
        console.error('Error al cargar el archivo pacientes.json ', error)
        Swal.fire({
            icon: 'error',
            text:'ocurrio un error al cargar la informacion'
        })
        document.getElementById('formularioActualizar').style.display = 'none';
    })

    
}

function llenarCampos(paciente){
    document.getElementById("nombreActualizar").value = paciente.nombre;
    document.getElementById("emailActualizar").value = paciente.email;
    document.getElementById("fechaNacimientoActualizar").value = paciente.fechaNacimiento;
    document.getElementById("sesionActualizar").value = paciente.terapia;
}




function mostrarFormularioActualizar() {
    // muestro el formulario de actualización
    document.getElementById('formularioActualizar').style.display = 'block';
    // carga la información actual del paciente en el segundo formulario
    cargarInformacion();
}

// Evento del botón "Guardar Cambios"
document.getElementById('guardarCambiosBtn').addEventListener('click', function () {
    guardarCambios(); // Guarda los cambios en la información del paciente
    // Oculta el formulario de actualización
    document.getElementById('formularioActualizar').style.display = 'none';
    // Mostrar el s.a de confirmación de actualización
    Swal.fire({
        icon: 'success',
        title: 'Información actualizada exitosamente.',
        showConfirmButton: false,
        timer: 2500
    })
    document.getElementById('nombrePaciente').value = ""; // se vacia el campo de entrada

});


// Función para guardar los cambios en la información del paciente
function guardarCambios() {
    // Obtener los valores actualizados de los campos del segundo formulario
    const nombre = document.getElementById("nombreActualizar").value;
    const email = document.getElementById("emailActualizar").value;
    const fechaNacimiento = document.getElementById("fechaNacimientoActualizar").value;
    const terapia = document.getElementById("sesionActualizar").value;

    // objeto con la información actualizada del paciente
    const paciente = {
        nombre: nombre,
        email: email,
        fechaNacimiento: fechaNacimiento,
        terapia: terapia
    };

    const pacientelS = localStorage.getItem("paciente");
    // Parsear el objeto JSON almacenado
    const pacienteLocal = JSON.parse(pacientelS);

    //actualizo info en pacientes.json
    fetch('../JSON/pacientes.json')
        .then(response => response.json())
        .then(data => {
            //findIndex metodo de array
            const pacienteIndex = data.findIndex(p => p.nombre === nombre);
            //no uso ternario por ser un if largo y entenderlo bien yo al escribirlo
            if (pacienteIndex !== -1) {
                // Si el paciente existe en pacientes.json, actualizar sus datos
                data[pacienteIndex] = paciente;
                // Convertir el array actualizado en una cadena JSON
                const pacientesJSON = JSON.stringify(data);
                // Guardar la información actualizada de pacientes.json en el localStorage
                localStorage.setItem('pacientesJSON', pacientesJSON);
                Swal.fire({
                    icon: 'success',
                    title: 'Información actualizada exitosamente.',
                    showConfirmButton: false,
                    timer: 2500
                });
                document.getElementById('nombrePaciente').value = ""; // se vacia el campo de entrada
            } else if (pacienteLocal.nombre === nombre){
                // Convertir el objeto en una cadena JSON
                const pacienteJSON = JSON.stringify(paciente);

                // Actualizar la información en el localStorage
                localStorage.setItem("paciente", pacienteJSON);
            } else {
                // Si el paciente no existe en pacientes.json, mostrar un mensaje de error
                console.error('El paciente no se encuentra en la base de datos.');
                Swal.fire({
                    icon: 'error',
                    text: 'El paciente no se encuentra en la base de datos.'
                });
            }
        
    })
    .catch(error => console.error('Error al cargar pacientes.json:', error));
}

// Agrega un evento click al botón "Eliminar Datos"
document.getElementById('eliminarDatosBtn').addEventListener('click', function () {
    eliminarDatos();
});

function eliminarDatos() {
    // Pregunta al usuario si quiere eliminar los datos
    Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: 'Esto va a eliminar todos los datos guardados. ¿Estás seguro de continuar?',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Elimina los datos del localStorage
            localStorage.removeItem("paciente");

            // Opcionalmente, puedes mostrar un mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Datos eliminados',
                text: 'Los datos se han eliminado correctamente.',
                showConfirmButton: false,
                timer: 2500
            });
            // se rstablecn los valores de los campos del formulario
            document.getElementById('nombreActualizar').value = '';
            document.getElementById('emailActualizar').value = '';
            document.getElementById('fechaNacimientoActualizar').value = '';
            document.getElementById('sesionActualizar').selectedIndex = 0; // Establecer la opción predeterminada
            //oculto el formulario
            document.getElementById('formularioActualizar').style.display = 'none';
            document.getElementById('nombrePaciente').value = ""; // se vacia el campo de entrada
        }
    });
}
