class ControladorPacientes {
    constructor() {
        this.pacientes = [];
        this.turnosOcupados = {};
    }
    agregarPaciente(paciente) {
        this.pacientes.push(paciente);
    }
    buscarPaciente(nombre) {
        return this.pacientes.find(paciente => paciente.nombreCompleto.toLowerCase() === nombre.toLowerCase());

    }
    pasarNombreMayuscula(paciente){
        return {
            ...paciente,
            nombreCompleto: paciente.nombreCompleto.toUpperCase()
        }
    }
    
    filtrarPacientesPorSesion(sesion) {
        return this.pacientes.filter(paciente => paciente.sesion.toLowerCase() === sesion.toLowerCase());
    }


    //para calcular años del paciente, aun trabajando en esta funcion
    calcularEdad(fechaNacimiento){
        const ahora = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = ahora.getFullYear() - nacimiento.getFullYear();
        
        if (ahora.getMonth() < nacimiento.getMonth() || (ahora.getMonth() === nacimiento.getMonth() && ahora.getDate() < nacimiento.getDate()  )) {
            edad--; //para completar la edad si aun no cumplio años
        }
        return edad; 
    }
    //aun trabajando en esta funcion
    agendarTurno(dia, hora, minutos, paciente) {
        const turnoKey = `${dia.toLowerCase()}_${hora}:${minutos}`;
        
        if (this.turnosOcupados[turnoKey]) {
            return false; // El turno ya está ocupado
        }

        this.turnosOcupados[turnoKey] = paciente; // Marcar el turno como ocupado
        return true; // Turno agendado con éxito
    }
}
//array para guardar pacientes
const pacientes = new ControladorPacientes(); 
const validarDia = (dia, diasHabiles, callback) => {
    const diaLowerCase = dia.toLowerCase();
    const esDiaValido = diasHabiles.includes(diaLowerCase);
    callback(esDiaValido);
}

function validarHorario(hora, minutos) {
    if (hora >= 7 && hora <= 22 && minutos>= 0 && minutos <= 59){
        return true;
    }
    return false;
}

function solicitarDia (validarDiaCallback, horarioCallback) {
    const diasHabiles  = ["lunes", "martes", "miercoles", "jueves", "sabado"]
    let dia;
    //verifico que el dia ingresado se encuentre en el array
    do {
        dia = prompt("Ingrese un día de la semana: ").toLowerCase();

        if (diasHabiles.includes(dia)) {
            alert(`Has elegido ${dia}`);
            console.log(dia);
            // Solicitar horario después de validar el día
            solicitarHorario(dia, validarDiaCallback); 
            break;
        } else if (dia === "viernes") {
            alert("Lo siento, no hay más turnos hoy :(");
        } else if (dia === "domingo") {
            alert("Lo siento, no atiendo los domingos.");
        } else {
            alert("Día incorrecto, por favor ingrese un día válido.");
        }
    } while (true);
}
//funciones de orden superior
function solicitarHorario(dia, validarDiaCallback) {
    do {
        let hora = parseInt(prompt("Elija el horario entre las 07 y las 22: "));
        let minutos = parseInt(prompt("Elija los minutos, entre 00 y 59: "))
        if (validarHorario(hora, minutos)) {
            alert("Su horario es: " + hora + ":" + minutos);

            // Verificar disponibilidad del turno
            if (pacientes.agendarTurno(dia, hora, minutos, nombre)) {
                console.log(`Turno agendado para ${nombre} el ${dia} a las ${hora}:${minutos}`);
            } else {
                console.log(`El turno para ${dia} a las ${hora}:${minutos} ya está ocupado. Por favor, elija otro horario.`);
                solicitarHorario(dia, validarDiaCallback); // Volver a solicitar horario
            }
            break;
        } else {
            alert("Por favor, elija un horario dentro del especificado.");
        }
    } while (true);
}

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


let nombre = prompt("Ingrese su nombre ").toLowerCase();
console.log(`nombre: ${nombre}`);

let esPaciente = prompt( nombre + " ya esta registrado ?(si/no)").toLowerCase();
console.log(`registrado: ${esPaciente}`);

if (esPaciente === "si"){
    const pacienteExistente = pacientes.buscarPaciente(nombre);
    if (pacienteExistente) {
        alert("Continuemos, elija día y horario para agendar la sesión");
        //for...in para recorrer y mostrar por consola
        console.log("Datos del paciente existente:");
        for (const propiedad in pacienteExistente) {
            console.log(`${propiedad}: ${pacienteExistente[propiedad]}`);
        }
        solicitarDia(validarDiaCallback, pacienteExistente);
        alert("Su turno fue agendado! Recibirá un mensaje confirmando su turno") 
    } else {
        console.log(`El/la paciente ${nombre} no se encuentra registrado.`);
    }
} else if (esPaciente ==="no"){
    alert("Bien, primero vamos a registrarte");
    const nuevoPaciente = {
        nombreCompleto: prompt("Nombre completo: "),
        fechaNacimiento: new Date(prompt("Cual es su fecha de nacimiento(formato YYYY-MM-DD?)?")),
        sesion: prompt("elija la sesión: (tameana/tinak) ")
    };
    // agrego al nuevo paciente en el array
    pacientes.agregarPaciente(nuevoPaciente); 
    const pacienteMayusculas = pacientes.pasarNombreMayuscula(nuevoPaciente);

    const edadCompleta = pacientes.calcularEdad(nuevoPaciente.fechaNacimiento);

    const pacientesTameana = pacientes.filtrarPacientesPorSesion("tameana");
    console.log("Pacientes en la sesión Tameana:");
    console.log(pacientesTameana);
    
    const pacientesTinak = pacientes.filtrarPacientesPorSesion("tinak");
    console.log("Pacientes en la sesión Tinak:");
    console.log(pacientesTinak);

    alert("Genial " + nombre + " continuemos");
    solicitarDia(validarDia, solicitarHorario);
    alert("Su turno fue agendado! Recibirá un mensaje confirmando su turno") 



    console.log("Detalles del paciente:");
    for (const propiedad in nuevoPaciente) {
        console.log(`${propiedad}: ${nuevoPaciente[propiedad]}`);
    }
}
