/*-------------VALIDACIONES------------- */
const formulario = document.getElementById('archivoForm');


/**----------------REGISTRO-------------------- */
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  var datos_registro = new FormData(formulario);
  fetch("/subir", { method: "POST",body: datos_registro,}).then((res) => res.json())
    .then((data) => {
      switch (data) {
        case "1":
          Swal.fire({
            icon: 'success',
            title: 'Consentimiento subido exitosamente',
            text: 'ahora espera a que este sea aceptado',
          }).then(function() {
            window.location = "/usuario";
          })
         
          break;
        case "2":
          Swal.fire({
            icon: 'error',
            title: 'algo salio mal...',
            text: 'el archivo que intentas subir no es un pdf ni un jpg!',
            footer: 'intentalo de nuevo'
          })
          break;
        case "3":
          Swal.fire({
            icon: 'error',
            title: 'algo salio mal...',
            text: 'ya has subido tu consentimiento, espera a que sea aceptado por favor'
          })
        break;
        default:
          break;
      }

    });

});