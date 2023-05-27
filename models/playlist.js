const {Schema, model}=require('mongoose');
const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
       
    },
    song:{
        type: String,
        
    },
    img:{
        type: String
        
        
    }
})



module.exports = model('Playlist',UserSchema);