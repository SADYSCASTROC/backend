const express = require('express');
const path = require('path');
require('dotenv').config();


//dbConfig
const { dbConnection } =  require('./database/config')
dbConnection();
//inicializa express
const app = express();

//lectura que viene en el body de una peticion http
app.use(express.json());

//node serve 
const server = require('http').createServer(app);


//path public //apuntar a mi servidor
const publicPath = path.resolve(__dirname,'public');
app.use(express.static(publicPath));


//Mis rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/categorias', require('./routes/categorias'));


server.listen(process.env.PORT, (err)=>{
    if(err)throw new Error(err);
    console.log('Servidor corrieno en puerto', process.env.PORT)
})

