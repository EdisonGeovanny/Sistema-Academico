const mongoose = require ('mongoose');
const authSchema = require ('./materia.model');

authSchema.statics = {
    create: function (data, cb){
        const user = new this(data)
        user.save(cb);
    }, 
    list: function (query, cb){
        this.find(query,cb);
    },
    update: function (query, cb){
        this.findByIdAndUpdate(query, cb);
    },
    delete: function (query, cb){
        this.findByIdAndDelete(query, cb);
    },
    ListId: function (query, cb){
        this.findById(query, cb);
    }
}

const authModel = mongoose.model('Materia', authSchema);
module.exports = authModel;
