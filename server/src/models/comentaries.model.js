import mongoose from 'mongoose'

const ComentariesSchema = new mongoose.Schema({
    comentary: {type: String, require: true},
    userPhoto: {type: String},
    userName: {type: String, require: true},
    userId: {type: String, require: true},
    likes: [],
    replies: [],
    module: {type: String, require: true}, 
    createdAt: {type:String}
})

const ComentaryModel = mongoose.model('Comentaries', ComentariesSchema);
export default ComentaryModel;
