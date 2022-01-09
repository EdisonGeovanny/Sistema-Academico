const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    Codigo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    Tipo_documento: {
        type: String,
        required: true,
        default: 'Cédula identidad',
        trim: true
    },
    DNI: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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
    Genero:{
        type: String,
        required: true, 
        trim:true
    },
    Estado_civil:{
        type: String,
        required: true, 
        trim:true,
        default:'Soltero(a)'
    },
    Fecha_nacimiento:{
        type: Date,
        required: true, 
        trim:true
    },
    Lugar_nacimiento:{
        type: String,
        required: true, 
        trim:true
    },
    Nacionalidad:{
        type: String,
        required: true, 
        trim:true,
        default: 'Ecuatoriana'
    },
    Etnia:{
        type: String,
        required: true, 
        trim:true,
        default: 'Mestizo'
    },
    Grupo_sanguineo:{
        type: String,
        required: true, 
        trim:true,
        default:'Desconocido'
    },
    Observacion_medica:{
        type: String,
        required: false, 
        trim:true,
        default: "Ninguna"
    },
    Tipo_discapacidad:{
        type: String,
        required: false, 
        trim:true,
        default: "Ninguno"
    },
    Carnet_discapacidad:{
        type: String,
        required: false, 
        trim:true,
        default: "No"
    },
    Porcentaje_discapacidad:{
        type: Number,
        required: false, 
        trim:true,
        default: "0"
    },
    Direccion:{
        type: String,
        required: true, 
        trim:true
    },
    Sector_domicilio:{
        type: String,
        required: true, 
        trim:true
    },
    Referencia_domicilio:{
        type: String,
        required: true, 
        trim:true
    },
    Estado:{
        type: Boolean,
        required: true, 
        default: true,
        trim:true
    },
    Observacion:{
        type: String, 
        required: false, 
        trim:true
    }
},{
    timestamps:true
});

module.exports = userSchema;