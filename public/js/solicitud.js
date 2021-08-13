

/*-------------VALIDACIONES------------- */
const solicitudForm = document.getElementById('solicitudForm');


/**----------------Solicitud-------------------- */
solicitudForm.addEventListener('submit', (e) => {
  e.preventDefault();
  var object = {};
  var datos_registro = new FormData(solicitudForm);
  datos_registro.forEach((value, key) => object[key] = value);
  fetch("/solicitud", {
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
            text: 'muchas gracias, porfavor sea paciente mientras miramos su solicitud',
            
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
         case "3":
          Swal.fire({
            icon: 'error',
            title: 'algo salio mal...',
            text: 'tu solicitud anterior no ha sido revisada, porfavor espera a que sea atendida',
            footer: 'o si quieres puedes contactarnos'
          })
          break; 
        default:
          break;
      }

    });

});
/**----------------ver solicitudes-------------------- */
function versolicitudes(){

  fetch("/versolicitud", {
    method: "GET",
    headers: {
      'Accept': 'application/json',
    },
    
  })
    .then((res) => res.json())
    .then((data) => {
      
        if(data==1){
          Swal.fire({
            icon: 'error',
            title: 'algo salio mal...',
            text: 'no tienes solicitudes aun',
            
          })
        }else{
          Swal.fire({
            icon: 'info',
            title: `solicitud #${data.id}`,
            text: data.respuesta_eps,
            footer: 'recuerda que siempre puedes contactarnos a nuestro numero oficial'
          })
          console.log(data);
        }
        
      

    });

};