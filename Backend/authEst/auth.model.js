const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    Codigo: {
        type: String,
        required: true,
        trim: true,
        unique: true
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
    Tutor: {
        type: String,
        required: true,
        trim: true
    },
    Fecha_nacimiento:{
        type: Date,
        required: true, 
        trim:true
    },
    Genero:{
        type: String,
        required: true, 
        trim:true
    },
    Discapacidad:{
        type: String,
        required: false, 
        trim:true
    },
    Direccion:{
        type: String,
        required: true, 
        trim:true
    },
    Email:{
        type: String,
        required: false, 
        trim:true
    },
    Telefono:{
        type: String,
        required: false, 
        trim:true
    },
    Celular:{
        type: String,
        required: false, 
        trim:true
    },
    Estado:{
        type: Boolean,
        required: true, 
        trim:true
    },
    Foto:{
        type: String,
        requiered: false, 
        trim:true
    },
    Grado:{
        type: String,
        required: true, 
        trim:true
    },
    Paralelo:{
        type: String,
        required: true, 
        trim:true
    },
    Usuario: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Contraseña: {
        type: String,
        required: true,
        trim: true
    } 
},{
    timestamps:true
});

module.exports = userSchema;