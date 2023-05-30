const {Schema, model}=require('mongoose');
const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
       
    },
    launchDate:{
        type: Date,
        required: [true, 'La fecha es obligatoria'],
    },
    description:{
        type: String,
        required: [true, 'La description es obligatora'],
        
    },
    duration: {
        type: Number,
        required: true,
       
    }
})



module.exports = model('Song',UserSchema);