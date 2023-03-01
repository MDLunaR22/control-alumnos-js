const {Schema, model} = require('mongoose');

const PersonaShcema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type:String,
        required:[true, 'La password es obligatoria']
    },
    rol:{
        type:String,
        default:'ALUMNO_ROLE',
        required:true
    },
    estado:{
        type:Boolean,
        default: true,
        required:true
    },
    cursos:{
        type: Array,
        default:[],
        required: true
    }
})

module.exports = model('Persona', PersonaShcema)