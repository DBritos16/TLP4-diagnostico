const { Schema, model} = require('mongoose');

const Task = new Schema({
    nombre: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    estado: {
        type: Boolean,
        default: false,
        require: true
    }
}, {versionKey: false, timestamps:  true});

module.exports = model('task', Task);