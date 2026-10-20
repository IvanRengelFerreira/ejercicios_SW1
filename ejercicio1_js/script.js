function generar() {
  let num = parseInt(document.getElementById("numPalabras").value);
  let mayusculas = document.getElementById("mayusculas").checked;
  let noRepetir = document.getElementById("noRepetir").checked;

  let palabras = [];

  while (palabras.length < num) {
    let palabra = diccionario[Math.floor(Math.random() * diccionario.length)];

    if (noRepetir && palabras.includes(palabra)) {
      continue;
    }

    palabras.push(palabra);
  }

  if (mayusculas) {
    palabras = palabras.map(p => p[0].toUpperCase() + p.slice(1));
  }

  document.getElementById("resultado").textContent = palabras.join("");
}
