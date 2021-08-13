

/*-------------VALIDACIONES------------- */
const formulario = document.getElementById('contactoForm');


/**----------------REGISTRO-------------------- */
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  var object = {};
  var datos_registro = new FormData(formulario);
  datos_registro.forEach((value, key) => object[key] = value);
  fetch("/contacto", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object),
  })
    .then((res) => res.json())
    .then((data) => {
      switch (data) {
        case "1":
          Swal.fire({
            icon: 'success',
            title: 'Formulario enviado exitosamente!',
            text: 'muchas gracias, esto nos ayudara a saber la eficacia de la vacuna',
            
          }).then(function() {
            window.location = "/usuario";
          })
         
          break;
        case "2":
          Swal.fire({
            icon: 'error',
            title: 'algo salio mal...',
            text: 'error interno',
            footer: 'intentalo de nuevo'
          })
          break;
        default:
          break;
      }

    });

});