const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const session= require('express-session');
const bodyParser = require('body-parser');

/*
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json());*/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


require('dotenv').config()
//bcrypt para contraseñas
const bcryptjs=require('bcryptjs');
//session
app.use(session({
    secret:'yojay',
    resave:true,
    saveUninitialized:true
}))
//base de datos
const connection=require('./database/db')


//motor de plantillas
app.set('view engine','ejs');

// rutas
app.use(express.static(__dirname + "/public"));
app.use('/', require('./router/router'));


app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Página no encontrada"
    })
})
// Iniciar servidor
app.listen(port, () => {
    console.log(`servidor ejecutandose en http://localhost:${port}`);
});