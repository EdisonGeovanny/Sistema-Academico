const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    Parentesco: {
        type: String,
        required: true,
        trim: true
    },
    Tipo_documento: {
        type: String,
        required: true,
        default: 'Cédula de identidad',
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
    Nivel_educacion:{
        type: String,
        required: true, 
        trim:true
    },
    Actividad:{
        type: String,
        required: true, 
        trim:true,
        default: 'Desconocido'
    },
    Area:{
        type: String,
        required: true, 
        trim:true,
        default: 'Desconocido'
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
    Telefono:{
        type: String,
        required: false, 
        trim:true,
        default: 'No'
    },
    Celular:{
        type: String,
        required: true, 
        trim:true,
        default: 'No'
    },
    Email:{
        type: String,
        required: false, 
        trim:true,
        default: 'No'
    },
    Observacion: {
        type: String,
        trim: true,
        default:'Ninguna'
    },
    Estado: {
        type: Boolean,
        trim: true,
        requerido: true,
        default: true,
        trim:true
    }
},{
    timestamps:true
});

module.exports = userSchema;