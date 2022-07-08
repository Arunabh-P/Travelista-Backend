const cloudinary = require("cloudinary")
const User = require("../models/User");
const Story = require("../models/Story");

exports.createStory = async (req, res) => {
    try {

        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "stories",
        });

        const newStoryData = {
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
            owner: req.user._id,

        };
        const story = await Story.create(newStoryData);

        const user = await User.findById(req.user._id);

        await user.save();
        res.status(201).json({
            success: true,
            message: "Story created",
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
};

exports.getStoryOfFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const stories = await Story.find({
            owner: {
                $in: user.following,
            }
        })
        .populate("owner")

        res.status(200).json({
            success: true,
            stories: stories.reverse(),
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}