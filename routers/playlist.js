const express = require('express')
const  router = express.Router()
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validate-fields');
const{validateJWT}= require('../middlewares/validate-jwt')

const{postPlaylist, getPlaylist,putImg} = require('../controllers/playlist')

router.post('/',[
    validateJWT,
    check('name','El nombre es requerido').not().isEmpty(),
   
    
    
    validarCampos
], postPlaylist)

router.get('/',[
    validateJWT,

], getPlaylist)


router.put('/img/:id',[
    check('id', 'La play list no existe').isMongoId(),
    validateJWT
], putImg)
module.exports=router