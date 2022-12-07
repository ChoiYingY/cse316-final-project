const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        userName: { type: String, required: true },
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        isPublished: { type: Boolean, required: true },
        likes: { type: Number, required: true },
        dislikes: { type: Number, required: true },
        listens: { type: Number, required: true },
        datePublished:{ type: Date },
        comments: { type: [{
            commenter: String,
            text: String
        }] }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
