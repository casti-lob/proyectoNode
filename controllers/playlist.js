const Playlist = require('../models/playlist')

async function postPlaylist(req, res){
    const {name,song,img} = req.body
    const userLog = req.userLogin
    
    const playlist = new Playlist({name,song,img})
    const isNewPlaylist = await Playlist.findOne({name})
    if(isNewPlaylist){
        return res.status(400).json({msg:"Ya existe una playlist con el mismo nombre"})

    }
    playlist.user = userLog
    await playlist.save()
    res.json({playlist})
}

async function getPlaylist(req, res){
    const userLog = req.userLogin
    const playlist = await Playlist.find({user: userLog._id})
    if(playlist.length){
        res.json(playlist)
    }else{
        res.status(404).json(`No tienes playlist`)

    }
}

//No se como añadir una cancion
async function putPlaylist(req, res){
    const id= req.params.id
    const {song}= req.body
    const playlist = await Playlist.find({_id:id})
    
    const userLog = req.userLogin
    
    if(userLog._id.equals(playlist[0].user)){
        playlist.song = song
        await Playlist.updateOne({_id:id},playlist)
        res.json({playlist})
    }else{
        res.status(400).send(`No es el dueño de la playlist`)
    }
}

module.exports={postPlaylist, getPlaylist , putPlaylist}