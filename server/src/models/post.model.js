const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "no photo"
    },
    postedBy: {
        type: ObjectId,
        ref: "user"
    },
})

// https://github.com/myesteban309595/proyecto_base_react_node_mongo/blob/main/server/src/models/post.js

module.exports = mongoose.model("Post",postSchema)