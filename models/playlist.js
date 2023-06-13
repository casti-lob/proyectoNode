const {Schema, model}=require('mongoose');
const PlaylistSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
       
    },
    img:{
        type: String
        
        
    },
    songs:[
        type:Schema.Types.ObjectId,
        ref: 'songs',
        required: false
    ]
       
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'users',
        required: false
    }

})
PlaylistSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model('Playlist',PlaylistSchema);