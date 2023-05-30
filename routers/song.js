const express = require('express')
const  router = express.Router()
const {check} = require('express-validator')

const{getSongs, postSong, delSong, getSong,putSong} = require('../controllers/song')

router.get('/',getSongs);
router.post('/',postSong);
router.put('/:id',[
    check('id','No existe la canción').isMongoId(),
],putSong)
router.get('/:id',[
    check('id','No existe la canción').isMongoId()
],getSong)
router.delete('/:id',[
    check('id','No existe la canción').isMongoId()
],delSong)
module.exports=router