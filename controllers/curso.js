//Importacion
const { response, request } = require('express');
//Modelos
const Curso = require('../models/curso');

const obtenerCursos = async(req = request, res = response) => {

     //Condición, me busca solo los categorias que tengan estado en true

     const listaCursos = await Promise.all([
         Curso.countDocuments(true)
     ]);
 
     res.json({
         msg: 'GET API de Alumnos/Maestros',
         listaCursos
     });


}

const obtenerCursoPorId = async(req = request, res = response) => {

    const { id } = req.params;
    const curso = await Curso.findById( id )
                                            .populate('persona', 'nombre');

    res.json({
        msg: 'curso por id',
        curso
    });

}


const crearCurso = async (req = request, res = response) => {

    const {estado, persona, ...body} = req.body
    const cursoDB = await Curso.findOne({ nombre: body.nombre });

    if (cursoDB) {
        return res.status(400).json({
            msg: `El curso ${cursoDB.nombre}, ya existe en la DB`
        });
    }

    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre,
        persona: req.persona._id
    }

    const curso = new Curso(data);
    //Guardar en DB
    await curso.save();

    res.status(201).json({
        msg: 'Agregando de curso',
        curso
    });

}


const actualizarCurso = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, estado, persona, ...data } = req.body;
    
    data.nombre = data.nombre;

    const curso = await Curso.findByIdAndUpdate( id, data, { new: true } );

    res.json({
        msg: 'Put de curso',
        curso
    });

}


const eliminarCurso = async(req = request, res = response) => {

    const { id } = req.params;
    const cursoBorrado = await Curso.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        msg: 'delete curso',
        cursoBorrado
    });

}



module.exports = {
    obtenerCursos,
    obtenerCursoPorId,
    crearCurso,
    actualizarCurso,
    eliminarCurso
}