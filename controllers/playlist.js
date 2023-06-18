const Playlist = require('../models/playlist')

const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL);

async function postPlaylist(req, res){
    const {name,song} = req.body
   
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

async function putImg(req,res){
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No se ha encontrado ficheros.');
        return;
    }
    const {id}= req.params
    playlist =  await Playlist.findById(id);
   
        if(playlist.img){
            const nombreArr = playlist.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            cloudinary.uploader.destroy(public_id);
        }
        const { tempFilePath } = req.files.file;
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath);
        model.img = secure_url;
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



module.exports={postPlaylist, getPlaylist , putImg}