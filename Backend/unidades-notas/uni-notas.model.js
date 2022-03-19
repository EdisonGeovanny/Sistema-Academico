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
    
      Fecha: {
        type: Date,
        required: true,
        default: new Date(),
        trim:true
      },
      Quimestre: {
        type: String,
        required: true,
        trim:true
      },
        Unidad:{
          type: String,
          required: true,
          trim:true
        },

        C1Tareas:{
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        C1Lecciones: {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        C1Ensayo: {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        C1Informes: {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        C1Promedio: {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },

        C2Tareas: {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        C2Lecciones: {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        C2Ensayo: {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        C2Informes: {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        C2Promedio: {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },

        C3Tareas: {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        C3Lecciones:  {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        C3Ensayo:  {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        C3Informes:  {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        C3Promedio:  {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },

        C4Tareas:  {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        C4Lecciones:  {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        C4Ensayo:  {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        C4Informes:  {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        C4Promedio:  {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        Refuerzo:  {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        Sumatoria:  {
          type: Number,
          required: false,
          default: '0',
          trim:true
        },
        NotaParcial:  {
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