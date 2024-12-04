let torres = [[], [], []];
const colors = ['red', 'orange', 'yellow', 'green', 'blue'];

function startGame() {
    let numDiscs = parseInt(document.getElementById('numDiscs').value);

    if (isNaN(numDiscs) || numDiscs < 1 || numDiscs > 5) {
        alert("Siusplau, has de ingresar un número de discos entre 1 i 5.");
        return;
    }

    // Inicializar torres
    torres = [[], [], []];
    for (let i = numDiscs; i >= 1; i--) {
        torres[0].push(i); // Añadir discos en la primera torre
    }

    // Dibujar las torres
    personalitzarTorres();
}

function personalitzarTorres() {
    torres.forEach((tower, index) => {
        const divTorre = document.getElementById(`torre${index + 1}`);
        divTorre.innerHTML = ""; // Vaciar la torre actual

        // Crear los discos en la torre
        tower.forEach((disk, i) => {
            const divDisc = document.createElement("div");
            divDisc.className = "disk";
            divDisc.style.backgroundColor = colors[disk - 1];
            divDisc.textContent = disk;
            divDisc.style.width = `${disk * 20 + 40}px`; // Tamaño proporcional
            divDisc.style.bottom = `${i * 22}px`; // Altura proporcional
            divTorre.appendChild(divDisc);
        });
    });
}

function mouDisc(torreAnterior, nextTorre) {
    if (torres[torreAnterior].length === 0) {
        alert("No hi ha discos en aquesta torre.");
        return;
    }

    const movimentDisc = torres[torreAnterior][torres[torreAnterior].length - 1];

    if (
        torres[nextTorre].length > 0 &&
        torres[nextTorre][torres[nextTorre].length - 1] < movimentDisc
    ) {
        alert("No es pot colocar un disc més gran a sobre de un més petit.");
        return;
    }

    torres[nextTorre].push(torres[torreAnterior].pop());
    personalitzarTorres();

    // Comprobar si se ha ganado
    if (torres[2].length === parseInt(document.getElementById("numDiscs").value)) {
        alert("Has guanyat! Has completat el trencaclosques!");
    }
}