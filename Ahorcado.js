// Definición de palabras
const palabras = ["manzana", "computar", "diamante", "elefante", "ciudadan", "escalera"];
let palabra = palabras[Math.floor(Math.random() * palabras.length)];
let palabraAdivinada = Array(palabra.length).fill("_");
let intentos = 1;
const intentosMaximos = 7;

// Selección de elementos
const palabraDisplay = document.getElementById("palabra-display");
const ahorcadoImagen = document.getElementById("ahorcado-imagen");
const replay = document.getElementById("replay");
const tecladoDiv = document.getElementById("teclado");

// Generar el teclado
function crearTeclado() {
  const letras = "abcdefghijklmnopqrstuvwxyz";
  letras.split("").forEach(letra => {
    const boton = document.createElement("button");
    boton.textContent = letra.toUpperCase();
    boton.id = `btn-${letra}`;
    boton.addEventListener("click", () => {
      seleccionarLetra(letra);
    });
    tecladoDiv.appendChild(boton);
  });
}

// Manejar clic en una letra
function seleccionarLetra(letra) {
  // Verifica si la letra ya está seleccionada (por si el usuario hace clic dos veces)
  document.getElementById(`btn-${letra}`).disabled = true; 

  if (palabra.includes(letra)) {
    palabra.split("").forEach((letraPalabra, index) => {
      if (letraPalabra === letra) {
        palabraAdivinada[index] = letra;
      }
    });
    actualizarDisplay();
    if (!palabraAdivinada.includes("_")) {
      alert("¡Felicidades, ganaste!");
      deshabilitarTeclado();
      replay.classList.remove("hidden");
    }
  } else {
    intentos++;
    ahorcadoImagen.src = `Imagenes\\${intentos}.Ahorcado.png`;
    if (intentos === intentosMaximos) {
      alert(`¡Perdiste! La palabra era "${palabra}".`);
      deshabilitarTeclado();
      replay.classList.remove("hidden");
    }
  }
}

// Deshabilita todos los botones del teclado
function deshabilitarTeclado() {
  document.querySelectorAll("#teclado button").forEach(button => {
    button.disabled = true;
  });
}

// Actualiza el display de la palabra
function actualizarDisplay() {
  palabraDisplay.textContent = palabraAdivinada.join(" ");
}

// Resetea el juego
function reiniciarJuego() {
  palabra = palabras[Math.floor(Math.random() * palabras.length)];
  palabraAdivinada = Array(palabra.length).fill("_");
  intentos = 1;
  actualizarDisplay();
  ahorcadoImagen.src = "Imagenes\\1.Ahorcado.png";
  replay.classList.add("hidden");

  // Habilitar los botones del teclado
  document.querySelectorAll("#teclado button").forEach(button => {
    button.disabled = false;
  });
}

// Inicializa el juego y el teclado
actualizarDisplay();
crearTeclado();

// Listener para el botón de reiniciar
replay.addEventListener("click", reiniciarJuego);
