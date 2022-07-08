const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: String,

  image: {
    public_id: String,
    url: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  /////
  tripDate: {
    type: String,
  },
  ////
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  ///////
  host: [
    {
      hosts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      place: {
        type:String,
        
      },
      number: {
        type:Number,
      }
      ,
      service: {
        type:String,
        
      }

    }
  ],
  buddy: [
    {
      buddys: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      gender: {
        type:String,
        
      },
      number: {
        type:Number,
      }
      ,
      place: {
        type:String,
        
      }

    }
  ]

  ///////

});

module.exports = mongoose.model("Post", postSchema);
