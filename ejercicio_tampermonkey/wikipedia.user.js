// ==UserScript==
// @name         Wikipedia mejorada
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Elimina el enlace de Donaciones y añade un botón para volver arriba
// @match        https://es.wikipedia.org/*
// @grant        none
// ==/UserScript==

// Este script elimina el enlace "Donaciones" de la parte de arriba de Wikipedia
// y añade un botón para volver arriba del artículo.

(function() {
  'use strict';

  // Eliminar el enlace de Donaciones
  let donaciones = document.getElementById('pt-sitesupport-2');
  if (donaciones) {
    donaciones.remove();
  }

  // Añadir botón para volver arriba
  let boton = document.createElement('button');
  boton.textContent = 'Arriba';
  boton.style.position = 'fixed';
  boton.style.bottom = '20px';
  boton.style.right = '20px';
  boton.style.zIndex = '1000';
  boton.style.padding = '10px 20px';
  boton.onclick = () => window.scrollTo(0, 0);
  document.body.appendChild(boton);
})();
