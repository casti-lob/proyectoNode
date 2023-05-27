const express = require('express')
const  router = express.Router()
const{getSongs, postSong} = require('../controllers/song')

router.get('/',getSongs);
router.post('/',postSong)
module.exports=router