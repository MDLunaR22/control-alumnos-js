const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Persona = require('../models/persona');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );
        
        const persona = await Persona.findById( uid );
        
        if ( !persona ) {
            return res.status(401).json({
                msg: 'Token no válido - La persona no existe en la base de datos'
            });
        }
        
        if ( !persona.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - Persona inactiva : Estado FALSE'
            });
        }

        req.persona = persona;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}


module.exports = {
    validarJWT
}