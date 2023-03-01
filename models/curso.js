const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del curso es obligatorio'],
        unique: true
    }, 
    persona:{
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    alumnos:{
        type:Array,
        default:[],
        required: true
    }
});

module.exports = model('Curso', CursoSchema);