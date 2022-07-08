const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const adminSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true,'please enter email'],
    },

    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    resetPasswordToken: String,
  resetPasswordExpire: Date,
  });
  adminSchema.pre("save", async function (next) {
      if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
      }
      next();
    });
  
    adminSchema.methods.matchPassword = async function (password) {
      return await bcrypt.compare(password,this.password);
    };
  
    adminSchema.methods.generateToken = function () {
      return jwt.sign({_id: this._id}, process.env.JWT_SECRET)
    }

    adminSchema.methods.getResetPasswordToken = function () {
      const resetToken = crypto.randomBytes(20).toString("hex");
    
      this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    
      return resetToken;
    };

  module.exports = mongoose.model("Admin", adminSchema);