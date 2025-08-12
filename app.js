// --- Variables Globales ---
// Estas variables almacenan el estado del juego y se utilizan en múltiples funciones.
let numeroSecreto = 0; // Almacena el número aleatorio que el usuario debe adivinar.
let intentos = 0; // Cuenta los intentos del usuario para la partida actual.
let listaNumerosSorteados = []; // Guarda los números que ya han sido secretos para no repetirlos.
let numeroMaximo = 10; // Define el rango de números para el juego (del 1 al 10).
let maximoIntentos = 3; // Establece el número máximo de intentos que tiene el jugador.

/**
 * Función para asignar texto a un elemento HTML.
 * @param {string} elemento - El selector del elemento HTML (por ejemplo, 'h1' o 'p').
 * @param {string} texto - El texto que se asignará al elemento.
 */
function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

/**
 * Lógica principal para verificar el intento del usuario.
 * Se ejecuta cada vez que el usuario intenta adivinar el número.
 */
function verificarIntento() {
  // Obtiene el valor del input del usuario y lo convierte a un número entero.
  let numeroUsuario = parseInt(document.getElementById("valorUsuario").value);

  // --- Validación de Entrada ---
  // Verifica si el valor no es un número (isNaN) o si está fuera del rango permitido.
  if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > numeroMaximo) {
    asignarTextoElemento(
      "p",
      `Ingresa un número válido, debe ser entre 1 y ${numeroMaximo}`
    );
    limpiarCaja();
    return; // Detiene la ejecución si la entrada es inválida.
  }

  // --- Lógica del Juego ---
  // Comprueba si el número del usuario coincide con el número secreto.
  if (numeroSecreto === numeroUsuario) {
    // Si acierta, muestra un mensaje de victoria.
    asignarTextoElemento(
      "p",
      `Acertaste el número. En ${intentos} ${
        intentos === 1 ? " intento." : " intentos."
      }`
    );
    document.getElementById("reiniciar").removeAttribute("disabled"); // Habilita el botón de "Nuevo Juego".
    document.getElementById("intentar").setAttribute("disabled", "true"); // Deshabilita el botón de "Intentar".
  } else {
    // Si no acierta, proporciona una pista.
    if (numeroUsuario > numeroSecreto) {
      asignarTextoElemento("p", "El número secreto es menor.");
    } else {
      asignarTextoElemento("p", "El número secreto es mayor.");
    }
    intentos++; // Incrementa el contador de intentos.
    limpiarCaja(); // Limpia el campo de entrada.

    // --- Control de Límite de Intentos ---
    // Verifica si el usuario se ha quedado sin intentos.
    if (intentos > maximoIntentos) {
      asignarTextoElemento(
        "p",
        `¡Agotaste los ${maximoIntentos} intentos! El número secreto era ${numeroSecreto}.`
      );
      document.getElementById("reiniciar").removeAttribute("disabled"); // Habilita el botón de "Nuevo Juego".
      document.getElementById("intentar").setAttribute("disabled", "true"); // Deshabilita el botón de "Intentar".
    }
  }
  return;
}

/**
 * Función para limpiar el campo de entrada del usuario.
 */
function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}

/**
 * Genera un número secreto aleatorio y único.
 * Utiliza recursión para asegurar que el número no se haya sorteado antes.
 * @returns {number|null} El número secreto generado o `null` si ya se sortearon todos.
 */
function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  console.log(numeroGenerado);
  console.log(listaNumerosSorteados);

  // Si todos los números posibles ya han sido sorteados, finaliza el juego.
  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", "Ya se sortearon todos los números.");
    return null;
  } else {
    // Si el número generado ya está en la lista de sorteados, genera uno nuevo (recursión).
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      // Si el número es único, lo añade a la lista y lo retorna.
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

/**
 * Establece las condiciones iniciales de una nueva partida.
 * Se llama al cargar la página y al reiniciar el juego.
 */
function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego del número secreto");
  asignarTextoElemento(
    "p",
    `Indica un número del 1 al ${numeroMaximo}. Tienes ${maximoIntentos} intentos.`
  );
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;

  document.getElementById("reiniciar").setAttribute("disabled", "true"); // Deshabilita el botón de "Nuevo Juego".
  document.getElementById("intentar").removeAttribute("disabled"); // Habilita el botón de "Intentar".
}

/**
 * Reinicia el juego, limpiando la caja de entrada y estableciendo las condiciones iniciales.
 * Se ejecuta al hacer clic en el botón "Nuevo Juego".
 */
function reiniciarJuego() {
  limpiarCaja();
  condicionesIniciales();
}

// Inicia el juego al cargar la página.
condicionesIniciales();