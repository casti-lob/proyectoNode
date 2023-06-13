const { request, response} = require('express')
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const validateJWT = async (req= request, res=response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try{
        //const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid) //Recuperamos el usuario
        req.userLogin = user;
        
        next();
    }catch(error){
     console.log(error)
     res.status(401).json({msg:'Token expirado'})

    }
}

module.exports = {
    validateJWT
}