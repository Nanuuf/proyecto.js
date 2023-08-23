function diaDisp () {
    let dia 
    do {
        dia = prompt("Ingrese un día de la semana: ").toLowerCase();
        switch (dia) {
            case "lunes":
            case "martes":
            case "miercoles":
            case "jueves":
            case "sábado":
                alert(`Has elegido ${dia}`);
                break;
            case "viernes":
                alert("lo siento, no hay más turnos hoy :(");
                break;
            case "domingo":
                alert(`lo siento, no atiendo los  ${dia}`);
                break;
            default:
                alert("Día incorrecto, por favor ingrese un día válido.");
                break;
        }
    } while (
        dia !== "lunes" &&
        dia !== "martes" &&
        dia !== "miercoles" &&
        dia !== "jueves" &&
        dia !== "sábado" 
    );
}

function horario(){
    let hora = parseInt(prompt("Elija el horario entre las 07 y las 22: "))
    while (hora < 7 || hora > 22 ){
        alert("por favor, elija un horario dentro del especificado")
        hora= parseInt(prompt("Elija otro horario "))
    }
    alert("su horario es: " + hora)
}


let nombre = prompt("Ingrese su nombre ").toLowerCase()

let paciente = prompt( nombre + " ya es paciente ?(si/no)")

if (paciente === "si"){
    alert("Continuemos, elija dia y horario para agendar la sesión")
    diaDisp()
    horario()
} else if (paciente ==="no"){
    alert("Bien, primero vamos a registrarte")
    nombreCompleto = prompt("Nombre completo: ")
    fecha= parseInt(prompt("Cual es su fecha de nacimiento?"))
    sesion = prompt("elija la sesion: (tameana/tinak) ")
    alert("Genial " + nombre + " continuemos")
    diaDisp()
    horario()
}

alert("Su turno fue agendado! Recibirá un mensaje confirmando su turno")