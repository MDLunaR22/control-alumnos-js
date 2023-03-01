const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAlumnoRole } = require('../middlewares/validar-roles');

//Controllers
const { asignarCurso } = require('../controllers/asignacion-curso');

const router = Router();

router.put('/:curso_id', [
    validarJWT, 
    esAlumnoRole,
    validarCampos
], asignarCurso);

module.exports = router;