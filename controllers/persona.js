
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Persona = require('../models/persona');

const getPersonas = async (req = request, res = response) => {

    const query = { estado: true };

    const listaPersonas = await Promise.all([
        Persona.countDocuments(query),
        Persona.find(query)
    ]);

    res.json({
        msg: 'GET API de personas',
        listaPersonas
    });

}

const postPersona = async (req = request, res = response) => {

    const { nombre, correo, password, rol, estado, cursos } = req.body;
    const personaDB = new Persona({ nombre, correo, password, rol, estado, cursos });

    const salt = bcryptjs.genSaltSync();
    personaDB.password = bcryptjs.hashSync(password, salt);
    await personaDB.save();

    res.status(201).json({
        msg: 'POST API de personas',
        personaDB
    });

}

const putPersona = async (req = request, res = response) => {

    const { id } = req.params;

    const { _id, rol, estado, ...resto } = req.body;

    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);
    const personaEditada = await Persona.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de persona',
        personaEditada
    });

}

const deletePersona = async (req = request, res = response) => {

    const { id } = req.params;
    const personaEliminada = await Persona.findByIdAndDelete(id);
    res.json({
        msg: 'DELETE API de persona',
        personaEliminada
    });

}

module.exports = {
    getPersonas,
    postPersona,
    putPersona,
    deletePersona
}