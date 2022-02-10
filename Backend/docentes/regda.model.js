const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    Tipo_documento: {
        type: String,
        required: true,
        default: 'Cédula de identificación',
        trim: true
    },
    DNI: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Apellidos: {
        type: String,
        required: true,
        trim: true
    },
    Nombres: {
        type: String,
        required: true,
        trim: true
    },
     Genero:{
        type: String,
        required: true, 
        trim:true,
        default:'Masculino'
    },
    Estado_civil:{
        type: String,
        required: true, 
        trim:true,
        default:'Soltero(a)'
    },
    Fecha_nacimiento:{
        type: Date,
        required: true, 
        trim:true
    },
    Lugar_nacimiento:{
        type: String,
        required: true, 
        trim:true
    },
    Nacionalidad:{
        type: String,
        required: true, 
        trim:true,
        default: 'Ecuatoriana'
    },
    Etnia:{
        type: String,
        required: true, 
        trim:true,
        default: 'Mestizo'
    },
    Grupo_sanguineo:{
        type: String,
        required: true, 
        trim:true,
        default:'Desconocido'
    },
    Telefono:{
        type: String,
        required: false, 
        trim:true,
        default: 'No'
    },
    Celular:{
        type: String,
        required: true, 
        trim:true,
        default: 'No'
    },
    Email:{
        type: String,
        required: false, 
        trim:true,
        default: 'No'
    },
    Observacion_medica:{
        type: String,
        required: false, 
        trim:true,
        default: "Ninguna"
    },
    Tipo_discapacidad:{
        type: String,
        required: false, 
        trim:true,
        default: "Ninguno"
    },
    Carnet_discapacidad:{
        type: String,
        required: false, 
        trim:true,
        default: "No"
    },
    Porcentaje_discapacidad:{
        type: Number,
        required: false, 
        trim:true,
        default: "0"
    },
    Direccion:{
        type: String,
        required: true, 
        trim:true
    },
    Sector_domicilio:{
        type: String,
        required: true, 
        trim:true
    },
    Referencia_domicilio:{
        type: String,
        required: true, 
        trim:true
    },
    Nombre_emergente:{
        type: String,
        required: false, 
        trim:true,
        default:'No'
    },
    Contacto_emergente:{
        type: String,
        required: false, 
        trim:true,
        default:'No'
    },
    Nivel_educacion:{
        type: String,
        required: true, 
        trim:true
    },
    Institucion:{
        type: String,
        required: true, 
        trim:true
    },
    Lugar_institucion:{
        type: String,
        required: true, 
        trim:true
    },
    Tipo_institucion:{
        type: String,
        required: true, 
        trim:true
    },
    Especialidad:{
        type: String,
        required: true, 
        trim:true
    },
    Fecha_grado:{
        type: Date,
        required: true, 
        trim:true
    },
   /* Nota_grado:{
        type: Number,
        required: true, 
        trim:true
    },
    Otros_titulos:{
        type: Array,
        required: true, 
        trim:true
    },*/
    Fecha_ingreso_magisterio:{
        type: Date,
        required: true,
        trim: true
    },
    Fecha_ingreso_institucion:{
        type: Date,
        required: true,
        trim: true
    }, 
    Años_servicio:{
        type: String,
        required: true, 
        trim:true
    },
    Condicion_laboral:{
        type: String,
        required: true, 
        trim:true,
        default:'Nombramiento Provisional'
    },
    Observacion: {
        type: String,
        trim: true,
        default:'Ninguna'
    },
    Estado:{
        type: Boolean,
        required: true, 
        trim:true,
        default: true
    },
},{
    timestamps:true
});

module.exports = userSchema;