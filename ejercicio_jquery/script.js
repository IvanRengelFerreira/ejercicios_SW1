$(function () {

  $("#botonRegistro").click(function () {
    // Ocultar el contenido principal y el botón
    $("#container").hide();
    $("#botonRegistro").hide();

    // Crear el formulario
    $("body").append(`
      <form id="formulario">
        <h2>Registro</h2>
        <p>Nombre y apellidos: <input type="text" id="nombre"> <span id="errorNombre"></span></p>
        <p>Email: <input type="text" id="email"> <span id="errorEmail"></span></p>
        <p>Teléfono: <input type="text" id="telefono"> <span id="errorTelefono"></span></p>
        <p>Contraseña: <input type="password" id="password"> <span id="errorPassword"></span></p>
        <button id="enviar">Enviar</button>
        <button id="cancelar">Cancelar</button>
        <p id="mensaje"></p>
      </form>
    `);

    $("#enviar").click(function (e) {
      e.preventDefault();   // que no se recargue la página
      validar();
    });

    $("#cancelar").click(function (e) {
      e.preventDefault();
      $("#formulario").remove();
      $("#container").show();
      $("#botonRegistro").show();
    });
  });

});

// Muestra el mensaje de error si el campo no es válido (o lo borra si lo es)
function comprobar(valido, idError, texto) {
  if (valido) {
    $(idError).text("");
  } else {
    $(idError).text(texto).css("color", "red");
  }
}

function validar() {
  let nombre = $("#nombre").val().trim();
  let email = $("#email").val().trim();
  let telefono = $("#telefono").val();
  let password = $("#password").val();

  // Al menos dos palabras, solo letras (con acentos y ñ)
  let nombreOk = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)+$/.test(nombre);
  // texto@texto.texto
  let emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // Solo números, sin espacios
  let telefonoOk = /^[0-9]+$/.test(telefono);
  // Mínimo 8 caracteres, una mayúscula, una minúscula y un número
  let passwordOk = password.length >= 8 && /[A-Z]/.test(password) &&
                   /[a-z]/.test(password) && /[0-9]/.test(password);

  comprobar(nombreOk, "#errorNombre", "Escribe nombre y apellidos, solo letras");
  comprobar(emailOk, "#errorEmail", "Email no válido");
  comprobar(telefonoOk, "#errorTelefono", "Solo números, sin espacios");
  comprobar(passwordOk, "#errorPassword", "Mínimo 8 caracteres, con mayúscula, minúscula y número");

  if (nombreOk && emailOk && telefonoOk && passwordOk) {
    $("#mensaje").text("¡Registro completado correctamente!").css("color", "green");
  } else {
    $("#mensaje").text("");
  }
}
