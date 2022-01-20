const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

      Docente: {
        type:  [mongoose.Types.ObjectId],
        required: true,
        trim:true
      },
      Periodo: {
        type: String,
        required: true, 
        trim:true
      },
      Nivel: {
        type: String,
        required: true, 
        trim:true
      },
      Paralelo: {
        type: String,
        required: true, 
        trim:true
      },
      Jornada: {
        type: String,
        required: true, 
        trim:true
      },
      Horas_semanales: {
        type: Number,
        required: false,
        default: 0,
        trim:true
      },
      Area: {
        type: String,
        required: true, 
        trim:true
      },
      Asignatura: {
        type: String,
        required: true, 
        trim:true
      },
      Horario: {
        type: Array,
        required: true, 
        trim:true
      },
      Estado: {
        type: String,
        required: true, 
        default: true,
        trim:true
      }
},{
    timestamps:true
});

module.exports = userSchema;