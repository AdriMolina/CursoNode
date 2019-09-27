//traemos a express
const express = require('express');
//modulo de express 
const bodyParser = require('body-parser');

const response = require('./network/response');

//Separar nuestras cabeceras
const router = express.Router();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(router);



//Recibe la el tipo de metodo (router)
router.get('/', function(req, res){

    //obtener informacion de quien me hace la peticion
    console.log(req.headers);
    res.header({
        "custom-header" : "Nuestro Valor personalizado"
    });
    
   // res.send('Hola desde el metodo get');
   response.success(req, res, 'Lista de mensajes', 201);
});

router.post('/message', function(req, res){
    console.log(req.query);
    console.log(req.body);

    if(req.query.error == "ok"){
        response.error(req, res, 'Lista de mensajes', 400);
    }else{
    res.status(201).send({error: '', body:'Creado correctamente'});
    //res.send('Hola desde el metodo post');
    }
});

/*app.use('/',function(req,res){
    res.send('Hola');
});*/

app.use('/app', express.static('public'));
app.listen(3000);
console.log('La aplicación esta escuchando en http://localhost:3000');

