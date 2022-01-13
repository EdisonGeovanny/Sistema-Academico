const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
       Paralelo: {
        type: String,
        required: true,
        unique: true,
        trim:true
      }
},{
    timestamps:true
});

module.exports = userSchema;