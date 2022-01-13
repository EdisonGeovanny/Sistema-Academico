const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

       Asignatura: {
        type: String,
        unique: true,
        trim:true
      },
      Area: {
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