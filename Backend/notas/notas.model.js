const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
       Matricula: {
        type: [mongoose.Types.ObjectId],
        required: true,
        trim:true
      },
      Estudiante: {
        type: [mongoose.Types.ObjectId],
        required: true,
        trim:true
      },
      Distributivo: {
        type: [mongoose.Types.ObjectId],
        required: true,
        trim:true
      },
      Docente: {
        type: [mongoose.Types.ObjectId],
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
      Q1P1: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      Q1P2: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      Q1EXAM: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      Q2P1: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      Q2P2: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      Q2EXAM: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      COM_Q1_P1: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      COM_Q1_P2: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      COM_Q1: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      COM_Q2_P1: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      COM_Q2_P2: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      COM_Q2: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      PRO_Q1_P1: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      PRO_Q1_P2: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      PRO_Q2_P1: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      PRO_Q2_P2: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      Dias_asistidos: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      Faltas_injustificadas: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      Faltas_justificadas: {
        type: Number,
        required: false,
        default: '0',
        trim:true
      },
      Observacion: {
        type: String,
        required: false,
        default: 'Ninguna',
        trim:true
      }
},{
    timestamps:true
});

module.exports = userSchema;