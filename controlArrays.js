let llista_numeros = new Array(5);

for (let i = 0; i < llista_numeros.length; i++) {
    llista_numeros[i] = Math.floor((Math.random() * 10) + 1)
    document.getElementById("contenedor").innerHTML += `<div>${llista_numeros[i]}</div>`;
}
let llista_bidimensional = new Array(5);

for (let i = 0; i < llista_bidimensional.length; i++) {
    llista_bidimensional[i] = Math.floor((Math.random() * 10) + 1)
}