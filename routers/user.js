const express = require('express')
const  router = express.Router()
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validate-fields');
const{validateJWT}= require('../middlewares/validate-jwt')

const{postUser, login, deleteUser} = require('../controllers/user');

router.post('/',[
    check('name','El nombre es requerido').not().isEmpty(),
    check('email','El email es requerido').not().isEmpty(),
    check('email','El email debe de ser valido').isEmail(),
    check('password','El password es requerido').not().isEmpty(),
    check('rol','El rol es requerido').not().isEmpty(),
    check('rol','El rol solo admite los valores ADMIN o USER').isIn(['ADMIN','USER']),
    validarCampos
], postUser)

router.get('/',[
    check('email','El email es requerido').not().isEmpty(),
    check('password','El password es requerido').not().isEmpty(),
    validarCampos
],login)

router.delete('/:id',[
    validateJWT,
    check('id','No existe el usuario').isMongoId(),
    validarCampos
],deleteUser)

module.exports= router