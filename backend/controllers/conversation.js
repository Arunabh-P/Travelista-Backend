const Conversation = require("../models/Conversation")

exports.Conversation = async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],

    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  exports.getOneUserAllConversation = async (req,res) => {
    try {
      const conversation = await Conversation.find({
        members: {$in:[req.params.userId]},
      })
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
      
    }
  }

  // get conv include 2 userId

  exports.getTwoUserConversation = async(req,res) =>{
    try {
      const conversation = await Conversation.findOne({
        members: {$all:[req.params.firstUserId, req.params.secondUserId]},

      })
      if(conversation){

        res.status(200).json(conversation);
      }else{
        const newConversation = new Conversation({
          members: [req.params.firstUserId, req.params.secondUserId],
    
        });
      
        try {
          const savedConversation = await newConversation.save();
          res.status(200).json(savedConversation);
        } catch (err) {
          res.status(500).json(err);
        }
      }
      
    } catch (err) {
      res.status(500).json(err);
      
    }
  }

  



