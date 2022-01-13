const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    Codigo: {
        type: String,
        required: true,
        unique: true,
        trim:true
      },
      Descripcion: {
        type: String,
        required: true, 
        trim:true
      },
      Fecha_inicio: {
        type: Date,
        required: true, 
        trim:true
      },
      Fecha_fin: {
        type: Date,
        required: true, 
        trim:true
      },
      Nota_maxima: {
        type: Number,
        required: true, 
        trim:true
      },
      Nota_base: {
        type: Number,
        required: true, 
        trim:true
      },
      Faltas_maximas: {
        type: Number,
        required: true, 
        trim:true
      },
      Numero_alumnos: {
        type: Number,
        required: true, 
        trim:true
      },
      Estado: {
        type: Boolean,
        required: true, 
        default: true,
        trim:true
      }
},{
    timestamps:true
});

module.exports = userSchema;