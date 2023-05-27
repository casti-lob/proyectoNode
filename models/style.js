const {Schema, model}=require('mongoose');
const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
       
    },
   
    description:{
        type: String,
        required: [true, 'La description es obligatora'],
        
    }
})



module.exports = model('Style',UserSchema);