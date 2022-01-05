const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    Parentesco: {
        type: String,
        required: true,
        trim: true
    },
    DNI: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Apellidos: {
        type: String,
        required: true,
        trim: true
    },
    Nombres: {
        type: String,
        required: true,
        trim: true
    },
    Fecha_nacimiento:{
        type: Date,
        required: true, 
        trim:true
    },
    Direccion:{
        type: String,
        required: true, 
        trim:true
    },
    Genero:{
        type: String,
        required: true, 
        trim:true,
        default:'Masculino'
    },
    Estado_civil:{
        type: String,
        required: true, 
        trim:true,
        default:'Soltero'
    },
    Profesion:{
        type: String,
        required: true, 
        trim:true
    },
    Email:{
        type: String,
        required: true, 
        trim:true
    },
    Telefono:{
        type: String,
        required: true, 
        trim:true
    },
    Celular:{
        type: String,
        required: true, 
        trim:true
    },
    Estado:{
        type: Boolean,
        required: true, 
        trim:true,
        default: true
    },
    Observacion: {
        type: String,
        trim: true
    }
},{
    timestamps:true
});

module.exports = userSchema;