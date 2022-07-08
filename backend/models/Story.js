const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    image: {
        public_id: String,
        url: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})

module.exports = mongoose.model("Story", storySchema)