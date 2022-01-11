const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    Estudiante: {
        type: [mongoose.Types.ObjectId],
        required: true,
        trim: true,
        unique:true
    },
    Representante: {
        type: [mongoose.Types.ObjectId],
        required: true,
        trim: true,
        unique:false
    },
    Nombre_madre: {
        type: String,
        required:true,
        trim: true
    },
    Nombre_padre: {
        type: String,
        required:true,
        trim: true
    },
    Convive: {
        type: String,
        required: true,
        trim: true
    },
    Numero_hermanos:{
        type: Number,
        required: true, 
        trim:true
    },
     Nombre_hermanos:{
        type: Array,
        required: false, 
        trim:true
    },
    Numero_en_institucion:{
        type: Number,
        required: true, 
        trim:true
    },
    En_institucion:{
        type: Array,
        required: true, 
        trim:true
    },
    Tipo_vivienda:{
        type: String,
        required: true, 
        trim:true
    },
    Material_vivienda:{
        type: String,
        required: true, 
        trim:true
    },
    Servicios_basicos:{
        type: Array,
        required: false, 
        trim:true
    },
    Propiedades:{
        type: String,
        required: true, 
        trim:true
    },
    Nombre_emergente:{
        type: String,
        required: true, 
        trim:true
    },
    Contacto_emergente:{
        type: String,
        required: true, 
        trim:true
    },
    Observacion:{
        type: String,
        required: true, 
        trim:true
    }
},{
    timestamps:true
});

module.exports = userSchema;