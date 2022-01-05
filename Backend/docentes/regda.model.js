const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

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
        trim:true,
        default:'Nombramiento Provisional'
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
    Genero:{
        type: String,
        required: true, 
        trim:true,
        default:'Masculino'
    },
    Observacion: {
        type: String,
        trim: true
    }
},{
    timestamps:true
});

module.exports = userSchema;