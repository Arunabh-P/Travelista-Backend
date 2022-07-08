const Message = require("../models/Message");

exports.usersMessage = async (req,res) => {
    const newMessage = new Message(req.body)

    try {
        
        const savedMessage = await newMessage.save()
        if(savedMessage){
            const replyMessage = await Message.findOne({ _id : savedMessage._id }).populate('sender');
            if(replyMessage){
                res.status(200).json(replyMessage);
            }else{
                res.status(500).json({ err:'error' });
            }
        }else{
            res.status(500).json({ error :'error' });
        }

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getMessagesLikeConversation = async(req,res) => {
    try {
        const messages = await Message.find({
            conversationId:req.params.conversationId
        }).populate('sender');
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json(err)
    }
}