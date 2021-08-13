const modal_container = document.getElementById('modal_container');
const modal_solicitud = document.getElementById('modal_solicitud');

const close = document.getElementById('close');

const archivo=document.getElementById('archivo');
const nombreArchivo=document.getElementById('nombre-archivo')
function solicitud(){
    modal_solicitud.classList.add('show');  
}
function cerrar_solicitud(){
    modal_solicitud.classList.remove('show');
}
document.getElementById("sintomas").onclick = function () {
    location.href = "/contacto";
};
document.getElementById("consentimiento").onclick = function () {
    modal_container.classList.add('show');  
};
 close.addEventListener('click', () => {
    modal_container.classList.remove('show');
});



    

archivo.addEventListener('change',()=>{
    let nombre=event.target.files[0].name;
    nombreArchivo.textContent=nombre;
})