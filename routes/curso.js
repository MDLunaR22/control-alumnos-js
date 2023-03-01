const { Router } = require('express');
const { check } = require('express-validator');

const { existeCursoPorId } = require('../helpers/db-validators');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esMaestroRole } = require('../middlewares/validar-roles');

//Controllers
const { obtenerCursos, obtenerCursoPorId, crearCurso, actualizarCurso, eliminarCurso } = require('../controllers/curso');

const router = Router();

// Obtener todas las categorias - publico
router.get('/mostrar', obtenerCursos);

// Obtener una categoria por el id - publico
router.get('/mostrar/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCursoPorId ),
    validarCampos
], obtenerCursoPorId);

// Crear Categoria - privado - cualquier persona con un token valido
router.post('/agregar', [
    validarJWT,
    esMaestroRole,
    check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    validarCampos
], crearCurso);

// Actualizar Categoria - privado - se requiere id y un token valido
router.put('/editar/:id', [
    validarJWT, 
    esMaestroRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCursoPorId ),
    check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCurso);

// Borrar una categoria - privado - se requiere id y un token valido - solo el admin puede borrar
router.delete('/eliminar/:id',[
    validarJWT,
    esMaestroRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCursoPorId ),
    validarCampos
], eliminarCurso);

module.exports = router;