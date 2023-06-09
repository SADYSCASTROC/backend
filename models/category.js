//Schema me ayuda a crear el modelo, 
//model ver fuera del archivo
const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({

    nombre: {
        type: String,
        required: true,
        unique: true

    },

    descripcion: {
        type: String,
        required: true,
    },

    estado: {
        type: Boolean,
        default: true
    },

});

module.exports = model('Categoria', CategoriaSchema)