const User = require('../models/users')
const bcryptjs = require('bcryptjs')
const{genJWT} = require('../helpers/genJWT')

async function postUser(req, res){
    const {name, email, password, rol}= req.body
    
    const newUser = new User({name, email, password, rol})

    const emailDuplicate = await User.findOne({email})
    
    if(emailDuplicate){
        return res.status(400).json({mensage: 'Ya existe un usuario con ese email'})
        
    }

    const salt = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync(password,salt);
    newUser.state;
    await newUser.save();
    res.json({newUser})

}

async function login(req, res){
    const{email, password}=req.body
    try{
        const user = await User.findOne({email})
        const validPassw = bcryptjs.compareSync(password,user.password)
        if(!user||!validPassw){
            return res.status(400).json({mensage:`Las credenciales estan mal`})
        }else{
            if(!user.state){
                return res.status(400).json({msg:'Lo sentimos pero el usuario fue eliminado'})
            }else{
               const token = await genJWT(user._id)
                res.json({token, msg:'Bienvenido'})
            }
        }
    }catch(error){
        console.log(error)
        res.status(500).json({msg:'Ha ocurrido un error inesperado'})
    }
}

async function deleteUser(req,res){
    const id= req.params.id;
    const userLog = req.userLogin
    if(userLog.rol=='ADMIN'|| userLog._id == id){
        const user = await User.findByIdAndUpdate(id,{"state":false})
        res.json({user, userLog})
    }else{
        return res.status(400).json({msg:'Solo puede borrar un usuario admin o el propietario'})

    }
    
}

async function putUser(req,res){
    const id = req.params.id 
    const user = await User.find({_id:id})
    const newUser = req.body
    
    const salt = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync(newUser.password,salt);
    const email = newUser.email
    const isDuplicateUser = await User.findOne({email})
    const userLog = req.userLogin
    if(newUser.rol !='ADMIN'&&newUser.rol !='USER'){
        res.status(400).send(`El rol debe de ser ADMIN o USER`)
    }else{
        if(userLog.rol =='ADMIN' || userLog.email == user[0].email){
            if(isDuplicateUser!=null && user[0].email != email){
             res.status(400).send(`Ya existe un usuario con ese correo`)
            }else if( user.length){
             await User.updateOne({_id: id}, newUser)
             res.json(newUser)
            }else{
             res.status(400).send(`No existe un usuario con el id ${id}`)
            }
         }else{
             res.status(400).send(`Tienes que ser Admin o el dueño de la cuenta`)
         }
    }
   

    
    
}

module.exports={postUser, login, deleteUser , putUser}