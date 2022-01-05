const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    Usuario: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Contraseña: {
        type: String,
        required: true,
        trim: true
    },
    Rol: {
        type: String,
        required: true,
        trim: true,
        default:'Docente'
    },
    Vinculo: {
        type: [mongoose.Types.ObjectId],
        required: true,
        trim: true,
        unique:false
    }

},{
    timestamps:true
});

module.exports = userSchema;