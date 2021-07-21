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
        type: Number,
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
    Fecha_ingreso_magisterio:{
        type: Date,
        required: true,
        trim: true
    },
    Fecha_ingreso_institucion:{
        type: Date,
        required: true,
        trim: true
    },
    Titulo_profesional: {
        type: String,
        required: true,
        trim: true
    }, 
    Años_servicio:{
        type: String,
        required: true, 
        trim:true
    },
    Condicion_laboral:{
        type: String,
        required: true, 
        trim:true
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
    Email:{
        type: String,
        required: true, 
        trim:true
    },
    Telefono:{
        type: Number,
        required: true, 
        trim:true
    },
    Celular:{
        type: Number,
        required: true, 
        trim:true
    },
    Foto:{
        type: String,
        requiered: false, 
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