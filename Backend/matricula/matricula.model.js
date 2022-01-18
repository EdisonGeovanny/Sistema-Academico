const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

      Estudiante: {
        type:  [mongoose.Types.ObjectId],
        unique: true,
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