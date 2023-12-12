import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema({
    title: {type: String, require: true},
    insertionCode: {type: String, require: true},
    moduleRute: {type: String, require: true}
})

const VideoModel = mongoose.model('Video', videoSchema);
export default VideoModel;