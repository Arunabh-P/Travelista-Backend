const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        conversationId:{
            type:String,
        },
        sender:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        text:{
            type:String,
            required: [true, "Please text message"],
        },
        
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Message',MessageSchema)