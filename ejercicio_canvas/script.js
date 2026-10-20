let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let img = new Image();
img.src = "img/cesta.svg";

let cesta = { x: 250, y: 400, ancho: 100, alto: 60 };
let fruta = { x: 300, y: 0, radio: 15 };
let velocidadFruta = 150;  // px por segundo
let velocidadCesta = 400;  // px por segundo
let puntos = 0;
let vidas = 3;
let teclas = {};
let ultimoTiempo = 0;

// Entrada del usuario
document.addEventListener("keydown", (e) => teclas[e.key] = true);
document.addEventListener("keyup", (e) => teclas[e.key] = false);
canvas.addEventListener("mousemove", (e) => {
  cesta.x = e.offsetX - cesta.ancho / 2;
});

function nuevaFruta() {
  fruta.x = Math.random() * (canvas.width - 30) + 15;
  fruta.y = 0;
}

function draw(timestamp) {
  // Segundos desde el último frame: así la velocidad no depende de los FPS
  let dt = (timestamp - ultimoTiempo) / 1000;
  ultimoTiempo = timestamp;

  if (vidas > 0) {
    // Mover la cesta con las flechas
    if (teclas["ArrowLeft"]) cesta.x -= velocidadCesta * dt;
    if (teclas["ArrowRight"]) cesta.x += velocidadCesta * dt;
    if (cesta.x < 0) cesta.x = 0;
    if (cesta.x > canvas.width - cesta.ancho) cesta.x = canvas.width - cesta.ancho;

    // Mover la fruta
    fruta.y += velocidadFruta * dt;

    // ¿La ha atrapado la cesta?
    if (fruta.y > cesta.y && fruta.x > cesta.x && fruta.x < cesta.x + cesta.ancho) {
      puntos++;
      velocidadFruta += 20;
      nuevaFruta();
    } else if (fruta.y > canvas.height) {
      vidas--;
      nuevaFruta();
    }
  }

  // 1. Limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. Dibujar los elementos
  ctx.fillStyle = "lightblue";                     // cielo
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();                                  // suelo
  ctx.moveTo(0, 460);
  ctx.lineTo(canvas.width, 460);
  ctx.strokeStyle = "green";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();                                  // fruta
  ctx.arc(fruta.x, fruta.y, fruta.radio, 0, 2 * Math.PI);
  ctx.fillStyle = "orange";
  ctx.fill();

  ctx.drawImage(img, cesta.x, cesta.y, cesta.ancho, cesta.alto);  // cesta

  ctx.fillStyle = "black";                          // texto
  ctx.font = "20px Arial";
  ctx.fillText("Puntos: " + puntos + "   Vidas: " + vidas, 10, 30);

  if (vidas === 0) {
    ctx.font = "50px Arial";
    ctx.fillText("Game Over", 170, 250);
  }

  window.requestAnimationFrame(draw);
}

window.addEventListener("load", () => {
  window.requestAnimationFrame((t) => {
    ultimoTiempo = t;
    draw(t);
  });
});
