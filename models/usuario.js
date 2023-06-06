//Schema me ayuda a crear el modelo, 
//model ver fuera del archivo
const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    
    nombre: {
        type: String,
        required: true,
    },

    email: {
        type: String, 
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        maxlength: 6,
        minlength: 10,
    },

});
