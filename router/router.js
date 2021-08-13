const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario')
const connection=require('../database/db')
const bcryptjs=require('bcryptjs');
const multer=require('multer');
var path = require('path')
//archivos
const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./archivos')
    },
    filename: (req,file,cb)=>{
        console.log(path.extname(file.originalname));

        cb(null,req.session.identificador+path.extname(file.originalname))
    }
    
})
const upload=multer({
    storage,
    fileFilter: function (req, file, cb) {
        console.log(path.extname(file.originalname));
        var ext = path.extname(file.originalname);
        if( ext !== '.jpg' && ext !== '.pdf' && ext !== '.jpeg') {
            return   cb(new Error('el archivo no es jpg ni pdf'))

        }
        cb(null, true)
    }
}).single('archivo')
//rutas
/* router.post('/subir', upload.single('archivo'),(req,res)=>{
    console.log(req.file)
    if (typeof req.file !== 'undefined') {

        res.json('1');
    }else{
        res.json('2');
    }
    //res.send('se subio correctamente')
})
*/
router.post('/subir', (req,res)=> {
    connection.query('SELECT * FROM usuario WHERE identificador=?',[req.session.identificador],async(error,results)=>{
        if (results.length=!0 && typeof results[0] !== 'undefined') {
            console.log(results[0]);
            if (results[0].consentimiento==0) {
                upload(req, res, function (err) {
                if (err) {
                    console.log(err);
                    res.json('2');
                } else{
                    connection.query('UPDATE usuario SET consentimiento= ? WHERE id = ?',[1,req.session.id_usuario],(error,results)=>{
                        if(error){
                            console.log(error);
                        }else{
                            req.session.consentimiento=1;
                            console.log('todobien');
                            res.json('1');
                            
                        }
                    })
                    
                }
                
                 // Everything went fine.
                 })
            }else{
                res.json('3');
            }
            
        }
        
    })
})








router.get('/login', (req, res) => {
    res.render('login', {
        titulo: 'login'
    })
})
router.get('/registro', (req, res) => {
    res.render('registro', {
        titulo: 'registro',
        
    })
})

router.get('/contacto', (req, res) => {
    if(req.session.loggedin){
        res.render('contacto', {
        titulo: 'inicio',
        loggedin:true,
        id_usuario:req.session.id_usuario,
        nombre:req.session.usuario,
        nacimiento:req.session.nacimiento
        })
    }else{
        res.render('index', {
            titulo: 'inicio',
            loggedin:false,
            nombre:''
        })
    }
    
})
router.get('/', (req, res) => {
    if(req.session.loggedin){
        res.render('index', {
        titulo: 'inicio',
        loggedin:true,
        nombre:req.session.usuario,
        nacimiento:req.session.nacimiento
        })
    }else{
        res.render('index', {
            titulo: 'inicio',
            loggedin:false,
            nombre:''
        })
    }
    
})
router.get('/usuario', (req, res) => {
    connection.query('SELECT * FROM etapa WHERE etapa=?',[5],async(error,results)=>{
        if(req.session.loggedin&&results.length!=0){
            connection.query('SELECT * FROM vacuna WHERE identificador=?',[req.session.identificador],async(error,vacuna)=>{
                let validador=false;
                if (new Date(results[0].edadMinima).getTime()>=new Date(req.session.nacimiento).getTime()) {
                    validador=true;
                } else {
                    validador=false
                }
                console.log(vacuna[0]);            
                if(vacuna.length!=0){
                    vacuna[0].primera_dosis=vacuna[0].primera_dosis.split(" ");
                    vacuna[0].primera_dosis[2]=vacuna[0].primera_dosis[2].slice(0, 3);
                    if (vacuna[0].segunda_dosis!='no') {
                        vacuna[0].segunda_dosis=vacuna[0].segunda_dosis.split(" ");
                        vacuna[0].segunda_dosis[2]=vacuna[0].segunda_dosis[2].slice(0, 3);
                    }
                    
                    console.log( vacuna[0].primera_dosis);
                   res.render('usuario', {
                        titulo: 'inicio',
                        loggedin:true,
                        nombre:req.session.usuario,
                        etapa:results[0].etapa,
                        descripcion:results[0].descripcion,
                        enEtapa:validador,
                        vacuna:vacuna[0].vacuna,
                        ciudad:vacuna[0].ciudad,
                        lugar:vacuna[0].lugar,
                        primeraDosis:vacuna[0].primera_dosis,
                        segundaDosis:vacuna[0].segunda_dosis,
                        validConsentimiento:vacuna[0].consentimiento_valido
                    }) 
                }else{
                    res.render('usuario', {
                        titulo: 'inicio',
                        loggedin:true,
                        nombre:req.session.usuario,
                        etapa:results[0].etapa,
                        descripcion:results[0].descripcion,
                        enEtapa:validador,
                        validConsentimiento:1

                    })
                }
            })
        }else{
            res.redirect('/');
        }
    })
})
router.get('/cerrarsesion', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/');
    });
    /*req.session.usuario=null;
    req.session.loggedin=false
    res.redirect('/')*/
    
    
})
router.post('/contacto',(req,res)=>{
    
    const datos=req.body;
    console.log(datos); 
    datos.identificador=req.session.identificador;
    console.log(datos); 
    
    connection.query('INSERT INTO contacto SET ?',datos,async(error,results)=>{
        if(error){
                
            console.log(error);  
            res.json('2');
            //res.json('1');
        }else{
            console.log('contacto agregado');
            //res.redirect('/login');
            res.json('1');
        }
    })
})
router.post('/solicitud',(req,res)=>{
    
    const datos=req.body;
    datos.identificador=req.session.identificador;
    datos.respuesta_eps='tu solicitud aun no ha sido atendida';
    console.log(datos); 
    connection.query('SELECT * FROM solicitudes WHERE identificador=?',[req.session.identificador],async(error,results)=>{
        if (results.length==0 ) {
            connection.query('INSERT INTO solicitudes SET ?',datos,async(err,resultado)=>{
            if(err){
                
                console.log(err);  
                res.json('2');
                //res.json('1');
            }else{
                console.log('solicitud agregada');
                //res.redirect('/login');
                res.json('1');
            }
            })
        }else{
            res.json('3');
        }
        
    })
})
router.get('/versolicitud',(req,res)=>{
    

    connection.query('SELECT * FROM solicitudes WHERE identificador=?',[req.session.identificador],async(error,results)=>{
        if (results.length==0 ) {
                console.log('no se encontro');
                //res.redirect('/login');
                res.json('1');
            
            
        }else{
            res.json(results[0]);
        }
        
    })
})
router.post('/registerconfirm',async(req,res)=>{
    //console.log(req); 
    const datos=req.body;
    console.log(datos); 
    datos.password= await bcryptjs.hash(req.body.password,8);
    connection.query('INSERT INTO usuario SET ?',datos,async(error,results)=>{
        if(error){
            if(error.errno==1062){
                res.json('2');
            }else{
               console.log(error);  
            }
            
            //res.json('1');
        }else{
            console.log('registrado');
            //res.redirect('/login');
            res.json('1');
        }
    })
})
router.post('/auth',(req,res)=>{
    const datos=req.body;
    connection.query('SELECT * FROM usuario WHERE identificador=?',[datos.identificador],async(error,results)=>{
        if (results.length==0|| !(await bcryptjs.compare(datos.password,results[0].password))) {
            console.log("no encontrado");
            res.json('2');
        } else {
            req.session.loggedin=true;
            req.session.id_usuario=results[0].id;
            req.session.identificador=results[0].identificador;
            req.session.usuario = results[0].nombre;
            req.session.nacimiento = results[0].nacimiento;
            req.session.ciudad = results[0].ciudad;
            req.session.consentimiento = results[0].consentimiento;

            res.json('1');
            //res.redirect('/');       
         }
    })
})

module.exports = router;