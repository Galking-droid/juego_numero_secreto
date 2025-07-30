let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let maximoIntentos = 3;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);

    //Verifica que el valor ingresado esté entre el rango indicado.
    if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > numeroMaximo) {
        asignarTextoElemento('p', `Ingresa un número válido, debe ser entre 1 y ${numeroMaximo}`);
        limpiarCaja();
        return;
    }
    
    if (numeroSecreto === numeroUsuario){
        asignarTextoElemento('p',`Acertaste el número. En ${intentos} ${(intentos === 1) ? ' intento.' : ' intentos.'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        //El usuario no acertó.
        if (numeroUsuario > numeroSecreto){
            asignarTextoElemento('p','El número secreto es menor.');
        } else{
            asignarTextoElemento('p','El número secreto es mayor.');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja(){
    document.querySelector('#valorUsuario').value = ''; 
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números.
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números.')
    } else { 
        //Si el número generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)){
           return generarNumeroSecreto();
    } else {
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}
    
}

function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}:`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    
}

function reiniciarJuego(){
    //Limpiar la caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números
    //Generar el número aleatorio
    //Inicializar el número de intentos
    condicionesIniciales();
    //Deshabilitar el botón Nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();