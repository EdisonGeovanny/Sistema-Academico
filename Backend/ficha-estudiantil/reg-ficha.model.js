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
        required: false,
        trim: true
    },
    Nombre_padre: {
        type: String,
        required: false,
        trim: true
    },
    Convive: {
        type: String,
        required: true,
        trim: true
    },
    Numero_hermanos:{
        type: String,
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
    Servicios:{
        type: Array,
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
    },
    Estado:{
        type: Boolean,
        required: true, 
        trim:true,
        default: true
    }

},{
    timestamps:true
});

module.exports = userSchema;