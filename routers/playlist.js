const express = require('express')
const  router = express.Router()
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validate-fields');
const{validateJWT}= require('../middlewares/validate-jwt')

const{postPlaylist, getPlaylist, putPlaylist} = require('../controllers/playlist')

router.post('/',[
    validateJWT,
    check('name','El nombre es requerido').not().isEmpty(),
    check('img','La imagen es requerida').not().isEmpty(),
    check('songs','No existe la canción').isMongoId(),
    check('user','No existe el usuario').isMongoId(),
    validarCampos
], postPlaylist)

router.get('/',[
    validateJWT,

], getPlaylist)

router.put('/:id',[
    validateJWT,

], putPlaylist)

module.exports=router