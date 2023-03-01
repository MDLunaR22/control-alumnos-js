const Persona = require('../models/persona');
const Curso = require('../models/curso');
const Role = require('../models/role');

const emailExiste = async( correo = '' ) => {
    const existeEmailDePersona = await Persona.findOne( { correo } );
    if ( existeEmailDePersona) {
        throw new Error(`El correo ${ correo }, ya esta registrado en la DB `);
    }
}

const esRoleValido = async( rol = '') => {
    const existeRolDB = await Role.findOne( { rol } );
    if ( !existeRolDB ) {
        throw new Error(`El rol ${ rol }, no existe en la DB `);
    }
}


const existePersonaPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfPeople = await Persona.findById( id );
    if ( !existIdOfPeople ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

const existeCursoPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfCurso = await Curso.findById( id );
    if ( !existIdOfCurso ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

module.exports = {
    emailExiste,
    esRoleValido,
    existePersonaPorId,
    existeCursoPorId
}