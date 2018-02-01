const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtSchema = new Schema({
    title:{
        type: String,
        required: true
    },

    link:{
        type: String,
        required: true
    },

    summary:{
        type: String
    }
})

const Article = mongoose.model("Article", ArtSchema);

module.exports = Article;