const { request, response  } = require('express');

const esMaestroRole = ( req = request, res = response, next ) => {

    if ( !req.persona ) {
        return res.status(500).json({
            msg: 'Se quiere verficar el rol sin validar el token primero'
        });
    }
    
    const { rol, nombre } = req.persona
    if ( rol !== 'MAESTRO_ROLE') {
        return res.status(401).json({
            msg: `${ nombre } no es un maestro no tiene opcion de hacerlo`
        });
    }

    next();

}

const esAlumnoRole = ( req = request, res = response, next ) => {

    if ( !req.persona ) {
        return res.status(500).json({
            msg: 'Se quiere verficar el rol sin validar el token primero'
        });
    }
    
    const { rol, nombre } = req.persona
    if ( rol !== 'ALUMNO_ROLE') {
        return res.status(401).json({
            msg: `${ nombre } no puede asignarse a una clase`
        });
    }

    next();

}

module.exports = {
    esMaestroRole,
    esAlumnoRole
}