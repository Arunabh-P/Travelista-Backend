 const Admin = require("../models/Admin");
const User = require("../models/User")
const crypto = require("crypto");

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res
                .status(400)
                .json({ success: false, message: "Admin already exists" });
        }

        admin = await Admin.create({
            email,
            password,
        });

        const Admintoken = await admin.generateToken()

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        res.status(201).cookie("Admintoken", Admintoken, options).json({
            success: true,
            admin,
            Admintoken,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email }).select("+password")


        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Admin does not exist"
            });
        }
        const isMatchPassword = await admin.matchPassword(password)

        if (!isMatchPassword) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }

        const Admintoken = await admin.generateToken()

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        res.status(200).cookie("Admintoken", Admintoken, options).json({
            success: true,
            admin,
            Admintoken,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })

    }
};

exports.logout = async (req, res) => {
    try {
        res
            .status(200)
            .cookie("Admintoken", null, { expires: new Date(Date.now()), httpOnly: true })
            .json({
                success: true,
                message: "Logged Out"
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}
exports.getUsers = async (req, res) => {
    try {
        const adminAllUsers = await User.find({

        });

        res.status(200).json({
            success: true,
            adminAllUsers,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.blockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            User.findByIdAndUpdate(
                req.params.id,
                { $set: { blockStatus: true } },
                function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).json({
                            success: true,
                            docs,
                        });
                    }
                }
            );
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
exports.unblockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            User.findByIdAndUpdate(
                req.params.id,
                { $set: { blockStatus: false } },
                function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).json({
                            success: true,
                            docs,
                        });
                    }
                }
            );
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.adminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id);
        res.status(200).json({
            success: true,
            admin,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};