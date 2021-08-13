window.addEventListener('scroll', revealY);
window.addEventListener('scroll', revealLeft);
window.addEventListener('scroll', revealRight)
window.addEventListener('load', revealOnload);
function revealY() {
    var reveals = document.querySelectorAll('.revealY');

    for (var i = 0; i < reveals.length; i++) {

        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        }
        else {
            reveals[i].classList.remove('active');
        }
    }
}
function revealLeft() {
    var reveals = document.querySelectorAll('.reveal-left');

    for (var i = 0; i < reveals.length; i++) {

        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        }
        else {
            reveals[i].classList.remove('active');
        }
    }
}
function revealRight() {
    var reveals = document.querySelectorAll('.reveal-right');

    for (var i = 0; i < reveals.length; i++) {

        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        }
        else {
            reveals[i].classList.remove('active');
        }
    }
}
function revealOnload() {
    var reveals = document.querySelectorAll('.reveal-onload');


    reveals[0].classList.add('active');


}
