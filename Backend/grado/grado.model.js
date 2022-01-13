const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

       Jornada: {
        type: String,
        required: true,
        trim:true
      },
      Paralelo: {
        type: String,
        required: true, 
        trim:true
      },
      Nivel: {
        type: String,
        required: true, 
        trim:true
      }
},{
    timestamps:true
});

module.exports = userSchema;