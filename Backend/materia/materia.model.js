const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

       Asignatura: {
        type: String,
        required: true,
        unique: true,
        trim:true
      },
      Area: {
        type: String,
        required: true, 
        trim:true
      }
},{
    timestamps:true
});

module.exports = userSchema;