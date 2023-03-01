//Importacion
const { response, request } = require('express');
const curso = require('../models/curso');
//Modelos
const Curso = require('../models/curso');
const Persona = require('../models/persona')

const asignarCurso = async (req = request, res = response) => {

    const {curso_id} = req.params;
    const persona = req.persona._id
    const cursos = req.persona.cursos;
    const cursoDB = await Curso.findOne({ _id: curso_id });
    if (!cursoDB) {
        return res.status(400).json({
            msg: `El curso, no existe en la DB`
        });
    }

    if (cursos.length >= 3) {
        return res.status(400).json({
            msg: 'Maximo 3 cursos'
        })
    }

    for (let curso of cursos) {

        if (cursoDB._id != curso) continue
        var exists = curso

    } if (exists) return res.status(400).json({
        msg: 'ya estas asignado a este curso'
    })
    const actualizarPersona = await Persona.findOneAndUpdate(
        { _id: persona },
        { $push: { 'cursos': curso_id } },
        { new: true }
    );


    const actualizarCurso = await Curso.findOneAndUpdate(
        { _id: curso_id },
        { $push: { 'alumnos': persona } },
        { new: true }
    );

    res.status(201).json({
        msg: 'asignado con exito al alumno',
        actualizarCurso, actualizarPersona
    });

}


module.exports = {
    asignarCurso
}