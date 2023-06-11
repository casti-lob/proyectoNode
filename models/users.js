const {Schema, model}=require('mongoose');
const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
       
    },
    email:{
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'El password es obligatorio'],
        
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN', 'USER']
    },
    state:{
        type: Boolean,
        default:true
    },
    playlist:{
        type:Schema.Types.ObjectId,
        ref: 'playlist',
        required: false
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model('User',UserSchema);