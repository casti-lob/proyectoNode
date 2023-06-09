const Song = require('../models/song')

async function getSongs(req,res){
    const {name}= req.query;
    let song;
    if(!name){
        song = await Song.find({})
    }else if(name){
        song =await Song.find({name})
    }

    if(song.length){
        res.status(200).json(song)
    }else{
        res.status(404).json(`La base de datos esta vacia, inserte datos`)
    }


    
}

async function getSong(req, res){
    const id = req.params.id
    const song = await Song.find({_id: id})
    if(song.length){
        res.json(song);
    }else{
        res.status(404).json(`No se ha encontrado la cancion con el id ${id}`)
    }
}

async function postSong(req, res){
    const {name,launchDate,description,duration}= req.body;
    const song = new Song({name,launchDate,description,duration})
    const isNewSong = await Song.findOne({name})
    if(isNewSong){
        return res.status(400).json({msg:"Ya existe una canción con el mismo nombre"})
    }
    await song.save();
    res.json({song})
}

async function delSong(req, res){
    const idSong = req.params.id    
    const song = await Song.find({_id: idSong})
    const userLog = req.userLogin
    if(userLog.rol =='ADMIN'){
        if(song.length){
            await Song.deleteOne({_id:idSong})
            res.json(song)
        }else{
            res.status(400).send(`No existe la cancion con id${idSong}`)
        }
    }else{
        res.status(400).send(`El usuario debe de ser ADMIN`)
    }
    
}

async function putSong(req, res){
    const id = req.params.id
    const song = await Song.find({_id:id})
    
   
    const newSong = req.body
    const name = newSong.name;
    const isDuplicateSong = await Song.findOne({name})
    const userLog = req.userLogin
    if(userLog.rol =='ADMIN'){
        if(isDuplicateSong!=null&& song[0].name != name){
            res.status(400).send(`Ya existe una cancion con el nombre ${name}`)
        }else if(song.length){
            await Song.updateOne({_id: id},newSong)
            res.json(newSong)
        }else{
            res.status(400).send(`No existe la cancion con id ${id}`)
        }
    }else{
        res.status(400).send(`El usuario debe de ser ADMIN`)
    }
    
}



module.exports={getSongs, postSong, getSong, delSong, putSong}