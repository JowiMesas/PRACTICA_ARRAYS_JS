let taulell = [];
const filas = 8;
const columnas = 8;
const  bombes = 10;
let puntuacio = 0;
let jocFinish = false;
let divPuntuacio = document.getElementById('puntuacio');
function iniciarJoc() {
  jocFinish = false;
    puntuacio = 0;
    divPuntuacio.textContent = puntuacio;
    generarTaulell();
    mostrarTaulell();
}
function generarTaulell() {
    //Creem el primer taulell inicial
    taulell = [];
    for (let i = 0; i < filas; i++) {
      taulell[i] = [];
      for (let k = 0; k < columnas; k++) {
        taulell[i][k] = 0; 
      }
    }
    let colocarBombes = 0;
    while (colocarBombes < bombes) {
        const fila = Math.floor(Math.random() * filas);
        const columna = Math.floor(Math.random() * columnas);
        if (taulell[fila][columna] !== "M") {
            taulell[fila][columna] = "M"; 
            colocarBombes++;
            for (let i = fila -1; i <= fila + 1; i++) {
                for (let k = columna -1; k <= columna + 1; k++) {
                    if (i >= 0 && i < filas && k>= 0 && k < columnas && taulell[i][k] !== "M") {
                        taulell[i][k]++;
                      }
                }
            }
        }
    }
}
function mostrarTaulell() {
    const taulellDiv = document.getElementById('taulell');
    taulellDiv.innerHTML = "";
    for (let i = 0; i < filas; i++) {
        for (let k = 0; k < columnas; k++) {
            const casella = document.createElement('div');
            casella.classList.add('casella');
            casella.dataset.fila = i;
            casella.dataset.columna = k;
            casella.addEventListener('click', () => mostrarCasella(i,k));
            taulellDiv.appendChild(casella);
        }
    }
    //Prova que ha de sortir per consola el taulell
    console.table(taulell);
}

function mostrarCasella(fila, columna) {
  if (jocFinish) return;
  const casella = document.querySelector(`.casella[data-fila='${fila}'][data-columna='${columna}']`);

  // Evitar que se procese una casilla ya descubierta
  if (!casella || casella.classList.contains('casellaDescoberta')) return;

  casella.classList.add('casellaDescoberta');

  if (taulell[fila][columna] === "M") {
      casella.classList.add('bomba');
      casella.textContent = "💣";
      alert("KBOOM!! Has perdut!!");
      mostrarTotesBombes();
      divPuntuacio.textContent = "PUNTUACIÓ: " + puntuacio + " KBOOM";
      jocFinish = true;
  } else {
      casella.classList.add('numero');
      casella.textContent = taulell[fila][columna] || "";
      puntuacio++;
      divPuntuacio.textContent = "PUNTUACIÓ: " + puntuacio;


      if (taulell[fila][columna] === 0) {
          mostrarCasellesConnectades(fila, columna); 
      }

      if (puntuacio === filas * columnas - bombes) {
          alert("Felicitats, has guanyat!");
          jocFinish = true;  
      }
  }
}

function mostrarCasellesConnectades(fila, columna) {
  for (let i = fila - 1; i <= fila + 1; i++) {
      for (let k = columna - 1; k <= columna + 1; k++) {
          if (i >= 0 && i < filas && k >= 0 && k < columnas) {
              mostrarCasella(i, k); 
          }
      }
  }
}
function mostrarTotesBombes() {
    for (let i = 0; i < filas; i++) {
        for (let k = 0; k < columnas; k++) {
          if (taulell[i][k] === "M") {
            const casella = document.querySelector(
              `.casella[data-fila='${i}'][data-columna='${k}']`
            );
            casella.classList.add('bomba');
            casella.textContent = "💣";
          }
        }
      }
}