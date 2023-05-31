const express = require('express')
const  router = express.Router()
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validate-fields');
const{validateJWT}= require('../middlewares/validate-jwt')


const{getSongs, postSong, delSong, getSong,putSong} = require('../controllers/song')

router.get('/',getSongs);
router.post('/', [
    check('name','El nombre es requerido').not().isEmpty(),
    check('launchDate','El formato de la fecha es DD-MM-YYYY').isDate({format: 'DD-MM-YYYY'}),
    check('launchDate','La fecha de lanzamiento es obligatoria').not().isEmpty(),
    check('description','La description es obligatoria').not().isEmpty(),
    check('duration','La duracion es obligatoria').not().isEmpty(),
    check('duration','La duracion no puede ser menor que 0.5').isFloat({min:0.5}),
    validarCampos
],
postSong);
router.put('/:id',[
    validateJWT,
    check('id','No existe la canción').isMongoId(),
],putSong)
router.get('/:id',[
    check('id','No existe la canción').isMongoId(),
    validarCampos
],getSong)
router.delete('/:id',[
    validateJWT,
    check('id','No existe la canción').isMongoId(),
    validarCampos
],delSong)
module.exports=router