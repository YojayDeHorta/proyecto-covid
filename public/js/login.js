

/*-------------VALIDACIONES------------- */
const formulario = document.getElementById('login');


/**----------------REGISTRO-------------------- */
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  var object = {};
  var datos_login = new FormData(formulario);
  datos_login.forEach((value, key) => object[key] = value);

  fetch("/auth", {
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
          window.location.replace("/");

          break;
        case "2":
          Swal.fire({
            icon: 'error',
            title: 'algo salio mal...',
            text: 'usuario o contraseña incorrecta!',
            footer: '<a href="recovery.php">Quieres recuperar tu contraseña?</a>'
          })
          break;
        default:
          break;
      }

    });

});

