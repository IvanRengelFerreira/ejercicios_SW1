const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const port = 3003;

const PALABRAS_POR_DEFECTO = 4;
const PALABRAS_MAXIMO = 20;

// Se lee el diccionario una sola vez al arrancar: una palabra por linea
const rutaDiccionario = path.join(__dirname, 'diccionario.txt');
const diccionario = fs.readFileSync(rutaDiccionario, 'utf8')
  .split(/\r?\n/)
  .map(palabra => palabra.trim())
  .filter(palabra => palabra.length > 0);

function generarPassword(numPalabras) {
  let palabras = [];
  for (let i = 0; i < numPalabras; i++) {
    // crypto.randomInt es mas seguro que Math.random para contraseñas
    let indice = crypto.randomInt(diccionario.length);
    palabras.push(diccionario[indice]);
  }
  return palabras.join('-');
}

const server = http.createServer((req, res) => {
  // req.url solo trae la ruta y la query (ej: "/?palabras=5"), hace falta una base para parsearla
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname !== '/') {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<h1>404 - Página no encontrada</h1>');
    return;
  }

  let numPalabras = parseInt(url.searchParams.get('palabras'));
  if (isNaN(numPalabras) || numPalabras < 1) {
    numPalabras = PALABRAS_POR_DEFECTO;
  }
  if (numPalabras > PALABRAS_MAXIMO) {
    numPalabras = PALABRAS_MAXIMO;
  }

  let password = generarPassword(numPalabras);
  console.log(`Contraseña generada con ${numPalabras} palabras`);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`
    <h1>Generador de contraseñas</h1>
    <p>Número de palabras: ${numPalabras}</p>
    <h2>${password}</h2>
    <p>Cambia el número de palabras con <code>?palabras=X</code> en la URL (máximo ${PALABRAS_MAXIMO}).</p>
  `);
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
  console.log(`Diccionario cargado con ${diccionario.length} palabras`);
  console.log(`Prueba: http://localhost:${port}/?palabras=5`);
});
