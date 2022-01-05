const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    Codigo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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
    Direccion:{
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