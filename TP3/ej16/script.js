
function validarCUIL() {
    let cuit = document.getElementById("cuit").value;
    let limpio = cuit.replace(/[-\s]/g, "");
    let salida = document.getElementById("resultado");

    if (!/^\d{11}$/.test(limpio)) {
        salida.textContent = "Formato inválido (use xx-xxxxxxxx-x)";
        return;
    }

    let digitos = limpio.split("").map(Number);
    let verificador = digitos[10];
    let pesos = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

    let calculado = calcularDigito(digitos.slice(0, 10), pesos);

    if (calculado === 10) {
        // cambiar tipo a 23 o 33 y recalcular
        let tipo = digitos[0] === 2 ? 23 : 33;
        digitos[0] = Math.floor(tipo / 10);
        digitos[1] = tipo % 10;
        calculado = calcularDigito(digitos.slice(0, 10), pesos);
    }

    if (calculado === 10) {
        salida.textContent = "Error: no existe dígito verificador válido";
        return;
    }

    salida.textContent = calculado === verificador
        ? "CUIT válido"
        : "CUIT inválido (verificador esperado: " + calculado + ")";
}

function calcularDigito(cuerpo, pesos) {
    let suma = 0;
    for (let i = 0; i < 10; i++) {
        suma += cuerpo[i] * pesos[i];
    }
    let resto = suma % 11;
    let digito = 11 - resto;
    return digito === 11 ? 0 : digito;  // si da 11 → verificador 0
}