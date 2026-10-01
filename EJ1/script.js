let numeroSecreto;
let intentos = 0;
let partidaTerminada = false;

let mejorPuntaje = null;
let partidasFinalizadas = 0;
let totalIntentos = 0;


// Iniciar partida
function iniciarPartida() {
    numeroSecreto = Math.floor(Math.random() * 1000) + 1;
    intentos = 0;
    partidaTerminada = false;
}


// Procesar intento
function procesarIntento(event) {

    event.preventDefault();

    // Si la partida ya terminó, no hacemos nada
    if (partidaTerminada) {
        return;
    }

    // Obtener número ingresado
    let input = document.getElementById("input-numero");
    let numeroIngresado = Number(input.value);


    // Contar intento
    intentos++;

    document.getElementById("stat-intentos").textContent = intentos;


    // Comparar número
    if (numeroIngresado < numeroSecreto) {

        document.getElementById("mensaje-pista").textContent =
            "El número es muy bajo. ¡Intentá nuevamente!";

    } else if (numeroIngresado > numeroSecreto) {

        document.getElementById("mensaje-pista").textContent =
            "El número es muy alto. ¡Intentá nuevamente!";

    } else {

        // El usuario acertó
        partidaTerminada = true;

        document.getElementById("mensaje-pista").textContent =
            "🎉 ¡Felicitaciones! ¡Adivinaste el número!";


        // Aumentar cantidad de partidas finalizadas
        partidasFinalizadas++;

        document.getElementById("stat-partidas").textContent =
            partidasFinalizadas;


        // Sumar los intentos de esta partida
        totalIntentos += intentos;


        // Calcular promedio
        let promedio = totalIntentos / partidasFinalizadas;

        document.getElementById("stat-promedio").textContent =
            promedio.toFixed(1);


        // Actualizar mejor puntaje
        if (mejorPuntaje === null || intentos < mejorPuntaje) {

            mejorPuntaje = intentos;

            document.getElementById("stat-mejor").textContent =
                mejorPuntaje;
        }
    }
}


// Reiniciar partida actual
function reiniciarPartida() {

    numeroSecreto = Math.floor(Math.random() * 1000) + 1;

    intentos = 0;

    partidaTerminada = false;


    // Actualizar cantidad de intentos
    document.getElementById("stat-intentos").textContent = 0;


    // Limpiar input
    document.getElementById("input-numero").value = "";


    // Actualizar mensaje
    document.getElementById("mensaje-pista").textContent =
        "¡Ingresá tu primer número para comenzar!";


    // Volver a colocar el cursor en el input
    document.getElementById("input-numero").focus();
}


// Comenzar primera partida
iniciarPartida();